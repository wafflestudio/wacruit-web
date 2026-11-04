import { FormEvent, useRef, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { CREATE_PATH, PATH } from "../shared/routes/constants";
import { AdminPreregistrationLoaderReturnType } from "./Loader/RecruitingResultLoader";
import { Forbidden } from "./RecruitingResult";
import { usePreRegisterQuery } from "../apis/preregister/preregister.query";
import {
  PreRegisterResponse,
  PreRegisterUpdate,
} from "../apis/preregister/preregister.types";
import { isForbiddenError } from "../apis/utility";
import Modal from "../components/Modal/Modal";
import RichTextEditor from "../components/admin/RichTextEditor";
import AttachmentManager from "../components/admin/AttachmentManager";
import { useEmailImages } from "../components/admin/useEmailImages";
import {
  AttachedImage,
  MAX_ATTACHMENTS,
  MAX_EMAIL_BYTES,
  estimateEmailBytes,
  formatFileSize,
  htmlToText,
  toEmailHtml,
  toPreviewHtml,
} from "../components/admin/emailContent";
import HtmlPanel, {
  HtmlEmailPreview,
  HtmlPanelView,
} from "../components/admin/HtmlEmailEditor";
import useModals from "../components/Modal/useModals";

const USER_PAGE_SIZE = 50;

export function AdminPreregistrationList() {
  const navigate = useNavigate();
  const { useGetPreRegisterList } = usePreRegisterQuery();
  const { data, isLoading, isError, error } = useGetPreRegisterList();

  if (isError && isForbiddenError(error)) return <Forbidden />;

  const preregistrations = data?.items ?? [];

  return (
    <Page>
      <Headerv2 />
      <Main>
        <BackButton type="button" onClick={() => navigate(PATH.ADMIN)}>
          ← 관리자 메뉴
        </BackButton>
        <PageTitle>사전등록 메일 전송</PageTitle>

        {isLoading && <StateMessage>불러오는 중...</StateMessage>}
        {isError && (
          <StateMessage $error>
            사전등록 목록을 불러오지 못했습니다.
          </StateMessage>
        )}
        {!isLoading && !isError && preregistrations.length === 0 && (
          <StateMessage>등록된 사전등록이 없습니다.</StateMessage>
        )}

        {preregistrations.length > 0 && (
          <RowList>
            {preregistrations.map((preregistration) => (
              <Row
                key={preregistration.id}
                type="button"
                onClick={() =>
                  navigate(
                    CREATE_PATH.ADMIN_PREREGISTRATION_DETAIL({
                      preregistrationId: preregistration.id,
                    }),
                  )
                }
              >
                <RowBody>
                  <RowTitle>{preregistration.generation}</RowTitle>
                  <RowMeta>{preregistration.url}</RowMeta>
                </RowBody>
                <Status $active={preregistration.is_active}>
                  {preregistration.is_active ? "활성" : "비활성"}
                </Status>
                <RowArrow>›</RowArrow>
              </Row>
            ))}
          </RowList>
        )}
      </Main>
    </Page>
  );
}

/** /admin-preregistration/:pre_registration_id — 사전등록 정보와 신청자 목록 */
export function AdminPreregistrationDetail() {
  const navigate = useNavigate();
  const { pre_registration_id } = useParams();
  const { useGetPreRegisterList, usePatchPreRegister } = usePreRegisterQuery();
  // 단건 조회 API가 없으므로 목록에서 찾는다
  const { data, isLoading, isError, error } = useGetPreRegisterList();
  const patchMutation = usePatchPreRegister();
  const [isEditing, setIsEditing] = useState(false);
  const [emailModal] = useModals(1);

  const toList = () => navigate(PATH.ADMIN_PREREGISTRATION);

  if (isError && isForbiddenError(error)) return <Forbidden />;

  const preregistration = data?.items.find(
    ({ id }) => String(id) === pre_registration_id,
  );

  const save = (body: PreRegisterUpdate) => {
    if (!preregistration) return;
    patchMutation.mutate(
      { id: preregistration.id, body },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const startEditing = () => {
    patchMutation.reset();
    setIsEditing(true);
  };

  return (
    <Page>
      <Headerv2 />
      <Main>
        <BackButton type="button" onClick={toList}>
          ← 사전등록 목록
        </BackButton>

        {isLoading && <StateMessage>불러오는 중...</StateMessage>}
        {isError && (
          <StateMessage $error>
            사전등록 정보를 불러오지 못했습니다.
          </StateMessage>
        )}
        {!isLoading && !isError && !preregistration && (
          <StateMessage>
            사전등록을 찾을 수 없습니다. 삭제되었거나 잘못된 주소일 수 있습니다.
          </StateMessage>
        )}

        {preregistration && (
          <>
            <DetailHeader>
              <PageTitle>{preregistration.generation}</PageTitle>
              <Status $active={preregistration.is_active}>
                {preregistration.is_active ? "활성" : "비활성"}
              </Status>
            </DetailHeader>

            <Section>
              <SectionHeader>
                <SectionLabel>사전등록 정보</SectionLabel>
                {!isEditing && (
                  <SecondaryButton type="button" onClick={startEditing}>
                    수정
                  </SecondaryButton>
                )}
              </SectionHeader>

              {isEditing ? (
                <PreregistrationForm
                  preregistration={preregistration}
                  isSaving={patchMutation.isLoading}
                  isSaveError={patchMutation.isError}
                  onSubmit={save}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <>
                  <InfoList>
                    <InfoItem>
                      <InfoLabel>기수</InfoLabel>
                      <InfoValue>{preregistration.generation}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>URL</InfoLabel>
                      <InfoValue>{preregistration.url}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>상태</InfoLabel>
                      <InfoValue>
                        {preregistration.is_active ? "활성" : "비활성"}
                      </InfoValue>
                    </InfoItem>
                  </InfoList>
                  {patchMutation.isSuccess && (
                    <FormMessage>저장했습니다.</FormMessage>
                  )}
                </>
              )}
            </Section>

            <Section>
              <SectionHeader>
                <SectionLabel>신청자 목록</SectionLabel>
                <PrimaryButton type="button" onClick={emailModal.openModal}>
                  메일 발송
                </PrimaryButton>
              </SectionHeader>
              <PreregistrationUsers preregistrationId={preregistration.id} />
            </Section>

            <Modal
              handle={emailModal}
              onBackgroundClicked={() => undefined}
              modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
            >
              <PreregistrationEmailModal
                preregistration={preregistration}
                onClose={emailModal.closeModal}
              />
            </Modal>
          </>
        )}
      </Main>
    </Page>
  );
}

export default function AdminPreregistration() {
  const loaderData = useLoaderData() as AdminPreregistrationLoaderReturnType;

  if (loaderData.forbidden) return <Forbidden />;

  return <Outlet />;
}

function PreregistrationForm({
  preregistration,
  isSaving,
  isSaveError,
  onSubmit,
  onCancel,
}: {
  preregistration: PreRegisterResponse;
  isSaving: boolean;
  isSaveError: boolean;
  onSubmit: (body: PreRegisterUpdate) => void;
  onCancel: () => void;
}) {
  const [generation, setGeneration] = useState(preregistration.generation);
  const [url, setUrl] = useState(preregistration.url);
  const [isActive, setIsActive] = useState(preregistration.is_active);

  const isDirty =
    generation !== preregistration.generation ||
    url !== preregistration.url ||
    isActive !== preregistration.is_active;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;

    onSubmit({ generation, url, is_active: isActive });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="preregistration-generation">기수</FieldLabel>
        <Input
          id="preregistration-generation"
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="preregistration-url">URL</FieldLabel>
        <Input
          id="preregistration-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </Field>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        활성화
      </CheckboxLabel>

      <FormFooter>
        {isSaveError && (
          <FormMessage $error>
            저장하지 못했습니다. 다시 시도해주세요.
          </FormMessage>
        )}
        <SecondaryButton type="button" onClick={onCancel} disabled={isSaving}>
          취소
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={!isDirty || isSaving}>
          {isSaving ? "저장 중..." : "저장"}
        </PrimaryButton>
      </FormFooter>
    </Form>
  );
}

function PreregistrationUsers({
  preregistrationId,
}: {
  preregistrationId: number;
}) {
  const { useGetPreRegisterUsers } = usePreRegisterQuery();
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isFetching } = useGetPreRegisterUsers({
    pre_registration_id: preregistrationId,
    limit: USER_PAGE_SIZE,
    offset: page * USER_PAGE_SIZE,
  });

  if (isLoading) return <StateMessage>불러오는 중...</StateMessage>;
  if (isError)
    return (
      <StateMessage $error>신청자 목록을 불러오지 못했습니다.</StateMessage>
    );

  const users = data?.items ?? [];
  if (page === 0 && users.length === 0)
    return <StateMessage>아직 신청자가 없습니다.</StateMessage>;

  const hasNextPage = users.length === USER_PAGE_SIZE;
  const start = page * USER_PAGE_SIZE;

  return (
    <>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <HeadCell>#</HeadCell>
              <HeadCell>이름</HeadCell>
              <HeadCell>이메일</HeadCell>
              <HeadCell>전화번호</HeadCell>
              <HeadCell>학교</HeadCell>
              <HeadCell>단과대학</HeadCell>
              <HeadCell>학과</HeadCell>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <BodyRow key={user.id}>
                <Cell>{start + index + 1}</Cell>
                <NameCell>{user.name}</NameCell>
                <Cell>{user.email}</Cell>
                <Cell>{user.phone_number}</Cell>
                <Cell>{user.university || "-"}</Cell>
                <Cell>{user.college || "-"}</Cell>
                <Cell>{user.department || "-"}</Cell>
              </BodyRow>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      <Pagination>
        <PageButton
          type="button"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0 || isFetching}
        >
          이전
        </PageButton>
        <PageInfo>
          {users.length > 0
            ? `${start + 1}–${start + users.length}번째`
            : "더 이상 신청자가 없습니다."}
        </PageInfo>
        <PageButton
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage || isFetching}
        >
          다음
        </PageButton>
      </Pagination>
    </>
  );
}

const toAttachmentPayload = ({ file, base64 }: AttachedImage) => ({
  file_name: file.name,
  content_type: file.type,
  content_base64: base64,
});

const DISCARD_HTML_CONFIRM =
  "HTML에서 직접 수정한 내용이 사라집니다. 텍스트 편집기로 돌아갈까요?";

/** 사전등록 신청자 전원에게 메일을 보낸다. 작성 → 확인 → 결과 순으로 진행한다 */
function PreregistrationEmailModal({
  preregistration,
  onClose,
}: {
  preregistration: PreRegisterResponse;
  onClose: () => void;
}) {
  const { usePostPreRegisterEmail } = usePreRegisterQuery();
  const { mutate, data, isLoading, isError, isSuccess, reset } =
    usePostPreRegisterEmail();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [view, setView] = useState<HtmlPanelView>("preview");
  // HTML을 직접 수정하는 동안에는 텍스트 편집기 대신 html 상태가 발송된다
  const [isHtmlEditing, setIsHtmlEditing] = useState(false);
  const [html, setHtml] = useState("");
  // 직접 수정을 시작할 때의 HTML. 이와 다르면 돌아갈 때 수정 내용이 사라진다고 확인한다
  const initialHtmlRef = useRef("");
  const [isConfirming, setIsConfirming] = useState(false);
  const images = useEmailImages((inlineImages) =>
    isHtmlEditing ? html : toEmailHtml(body, inlineImages),
  );
  const { emailHtml: htmlContent, attachments, usedInlineImages } = images;
  const content = htmlToText(htmlContent);
  const previewHtml = toPreviewHtml(htmlContent, images.inlineImages);
  const emailBytes = estimateEmailBytes(
    [subject, content, htmlContent],
    [...attachments, ...usedInlineImages].map(({ base64 }) => base64.length),
  );
  // 용량 초과는 서버가 발송 접수 뒤에 검사해 조용히 실패하므로 여기서 막는다
  const problems = [
    images.missingCids.length > 0 &&
      `HTML이 참조하는 본문 이미지(cid: ${images.missingCids.join(
        ", ",
      )})가 없습니다.`,
    images.imageCount > MAX_ATTACHMENTS &&
      `이미지는 본문과 첨부를 합쳐 최대 ${MAX_ATTACHMENTS}개까지 보낼 수 있습니다.`,
    emailBytes > MAX_EMAIL_BYTES &&
      "메일 용량이 2MB를 넘습니다. 이미지를 줄여주세요.",
  ].filter((problem): problem is string => !!problem);
  // 이미지 배너만 있는 HTML처럼 텍스트가 없어도 발송할 수 있게 HTML 원문으로 판단한다
  const canProceed =
    !!subject.trim() && !!htmlContent.trim() && problems.length === 0;

  // 텍스트 편집기 내용을 HTML로 옮겨 직접 수정한다. HTML을 텍스트 편집기로 되돌리는 변환은 하지 않는다
  const startHtmlEditing = () => {
    const generated = toEmailHtml(body, images.inlineImages);
    initialHtmlRef.current = generated;
    setHtml(generated);
    setIsHtmlEditing(true);
  };

  const stopHtmlEditing = () => {
    if (
      html !== initialHtmlRef.current &&
      !window.confirm(DISCARD_HTML_CONFIRM)
    )
      return;
    setIsHtmlEditing(false);
  };

  const toConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;
    setIsConfirming(true);
  };

  const send = () =>
    mutate({
      subject: subject.trim(),
      content,
      html_content: htmlContent,
      pre_registration_id: preregistration.id,
      active_only: false,
      ...(attachments.length > 0 && {
        attachments: attachments.map(toAttachmentPayload),
      }),
      ...(usedInlineImages.length > 0 && {
        inline_images: usedInlineImages.map((image) => ({
          ...toAttachmentPayload(image),
          content_id: image.cid,
        })),
      }),
    });

  if (isSuccess && data) {
    return (
      <ModalCard>
        <ModalTitle>메일 발송을 요청했습니다</ModalTitle>
        <ModalDescription>
          전체 신청자 {data.total_count}명 중 {data.queued_count}명에게 보낼
          메일이 발송 대기열에 들어갔습니다. 실제 도착까지는 시간이 걸릴 수
          있습니다.
        </ModalDescription>
        {data.is_truncated && (
          <Warning>
            한 번에 보낼 수 있는 인원({data.recipient_limit}명)을 넘어{" "}
            {data.total_count - data.queued_count}명에게는 발송되지 않았습니다.
            같은 메일을 다시 발송하면 남은 신청자가 아니라 이미 받은 신청자에게
            중복으로 발송됩니다.
          </Warning>
        )}
        <ModalFooter>
          <PrimaryButton type="button" onClick={onClose}>
            확인
          </PrimaryButton>
        </ModalFooter>
      </ModalCard>
    );
  }

  if (isConfirming) {
    return (
      <ModalCard>
        <ModalTitle>메일을 발송할까요?</ModalTitle>
        <ModalDescription>
          {preregistration.generation} 사전등록 신청자 <strong>전원</strong>
          에게 아래 메일을 보냅니다. 발송한 메일은 취소할 수 없습니다.
        </ModalDescription>
        <Preview>
          <PreviewSubject>{subject.trim()}</PreviewSubject>
          <HtmlEmailPreview html={previewHtml} />
        </Preview>
        {attachments.length > 0 && (
          <PreviewAttachments>
            첨부파일: {attachments.map(({ file }) => file.name).join(", ")}
          </PreviewAttachments>
        )}
        {isError && (
          <FormMessage $error>
            메일을 발송하지 못했습니다. 다시 시도해주세요.
          </FormMessage>
        )}
        <ModalFooter>
          <SecondaryButton
            type="button"
            onClick={() => {
              reset();
              setIsConfirming(false);
            }}
            disabled={isLoading}
          >
            이전
          </SecondaryButton>
          <PrimaryButton type="button" onClick={send} disabled={isLoading}>
            {isLoading ? "발송 중..." : "발송"}
          </PrimaryButton>
        </ModalFooter>
      </ModalCard>
    );
  }

  return (
    <ModalCard as="form" onSubmit={toConfirm} $wide>
      <ModalTitle>메일 작성</ModalTitle>
      <ModalDescription>
        {preregistration.generation} 사전등록 신청자 전원에게 발송됩니다.
      </ModalDescription>
      <Field>
        <FieldLabel htmlFor="preregistration-email-subject">제목</FieldLabel>
        <Input
          id="preregistration-email-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={255}
          required
        />
      </Field>
      <Composer>
        <Field>
          <ComposerHeader>
            <FieldLabel as="span">본문</FieldLabel>
          </ComposerHeader>
          {isHtmlEditing ? (
            <HtmlEditingNotice>
              <p>
                HTML을 직접 수정하고 있습니다. 오른쪽 코드가 그대로 발송되며,
                텍스트 편집기 내용은 발송되지 않습니다.
              </p>
              <SecondaryButton type="button" onClick={stopHtmlEditing}>
                텍스트 편집기로 돌아가기
              </SecondaryButton>
            </HtmlEditingNotice>
          ) : (
            <RichTextEditor
              html={body}
              onChange={setBody}
              onImageFiles={async (files) =>
                (await images.addInlineImages(files)).map(({ url }) => url)
              }
              isImageFull={images.isFull}
              placeholder="메일 본문을 입력하세요"
            />
          )}
          <AttachmentManager {...images} />
          <SizeInfo $error={emailBytes > MAX_EMAIL_BYTES}>
            메일 용량 약 {formatFileSize(emailBytes)} /{" "}
            {formatFileSize(MAX_EMAIL_BYTES)}
          </SizeInfo>
          {problems.map((problem) => (
            <FormMessage key={problem} $error>
              {problem}
            </FormMessage>
          ))}
        </Field>
        <HtmlPanel
          html={htmlContent}
          previewHtml={previewHtml}
          view={view}
          onViewChange={setView}
          editable={isHtmlEditing}
          onChange={setHtml}
          action={
            view === "code" &&
            !isHtmlEditing && (
              <TextButton type="button" onClick={startHtmlEditing}>
                직접 수정
              </TextButton>
            )
          }
        />
      </Composer>
      <ModalFooter>
        <SecondaryButton type="button" onClick={onClose}>
          취소
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={!canProceed}>
          다음
        </PrimaryButton>
      </ModalFooter>
    </ModalCard>
  );
}

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 12.8rem 2rem 8rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-top: 8.8rem;
  }
`;

const BackButton = styled.button`
  margin-bottom: 1.6rem;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[500]};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const PageTitle = styled.h1`
  margin: 0 0 0.8rem;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3.2rem;

  ${PageTitle} {
    margin-bottom: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`;

const SectionLabel = styled.p`
  margin: 0 0 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[500]};

  ${SectionHeader} & {
    margin-bottom: 0;
  }
`;

const RowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  padding: 2rem 2.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.black[100]};
    border-color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const RowBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
`;

const RowTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const RowMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.black[500]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RowArrow = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes[24]};
  line-height: 1;
  color: ${({ theme }) => theme.colors.black[500]};
`;

const Status = styled.span<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.lime : theme.colors.black[200]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black[900] : theme.colors.black[700]};
`;

const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 0;
  padding: 2.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 2.4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const InfoLabel = styled.dt`
  flex-shrink: 0;
  width: 8rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const InfoValue = styled.dd`
  margin: 0;
  min-width: 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[900]};
  word-break: break-all;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
`;

const Input = styled.input`
  padding: 1.2rem 1.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[900]};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
  cursor: pointer;
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const FormMessage = styled.p<{ $error?: boolean }>`
  margin: 1.2rem 0 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.pink : theme.colors.black[500]};

  ${FormFooter} & {
    margin: 0 auto 0 0;
  }
`;

const PrimaryButton = styled.button`
  padding: 1.2rem 2.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[900]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.black[100]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &:disabled {
    border-color: ${({ theme }) => theme.colors.black[300]};
    background: ${({ theme }) => theme.colors.black[300]};
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.black[900]};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.black[300]};
    cursor: not-allowed;
  }

  ${FormFooter} & {
    padding: 1.2rem 2.4rem;
  }
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const HeadCell = styled.th`
  padding: 1.4rem 1.6rem;
  text-align: left;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[700]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
`;

const Cell = styled.td`
  padding: 1.4rem 1.6rem;
  color: ${({ theme }) => theme.colors.black[900]};
  white-space: nowrap;
`;

const NameCell = styled(Cell)`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const BodyRow = styled.tr`
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

const PageButton = styled.button`
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[900]};
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors.black[300]};
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const ModalCard = styled.div<{ $wide?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: ${({ $wide }) => ($wide ? "112rem" : "56rem")};
  max-width: calc(100vw - 4rem);
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: 3.2rem;
  border-radius: 1.6rem;
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[24]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const ModalDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 160%;
  color: ${({ theme }) => theme.colors.black[700]};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 0.8rem;

  ${SecondaryButton} {
    padding: 1.2rem 2.4rem;
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 32rem;
  overflow-y: auto;
  padding: 2rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.black[100]};
`;

const Composer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2.4rem;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

// 오른쪽 패널의 미리보기/코드 토글과 높이를 맞춘다
const ComposerHeader = styled.div`
  display: flex;
  align-items: center;
  min-height: 2.8rem;
`;

const HtmlEditingNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.black[100]};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes[14]};
    line-height: 160%;
    color: ${({ theme }) => theme.colors.black[700]};
  }
`;

const TextButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.4rem;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const SizeInfo = styled.p<{ $error: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.pink : theme.colors.black[500]};
`;

const PreviewAttachments = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.black[500]};
  word-break: break-all;
`;

const PreviewSubject = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const Warning = styled.p`
  margin: 0;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.beige};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 160%;
  color: ${({ theme }) => theme.colors.black[900]};
`;

const StateMessage = styled.p<{ $error?: boolean }>`
  margin: 4rem 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.pink : theme.colors.black[500]};
`;
