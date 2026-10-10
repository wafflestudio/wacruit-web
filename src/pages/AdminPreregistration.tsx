import { FormEvent, useState } from "react";
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
  PreRegisterEmailAttachment,
  PreRegisterResponse,
  PreRegisterUpdate,
} from "../apis/preregister/preregister.types";
import { isForbiddenError } from "../apis/utility";
import Modal from "../components/Modal/Modal";
import EmailBlockEditor, {
  EmailBlockPreview,
} from "../components/admin/EmailBlockEditor";
import {
  EmailBlock,
  blocksToImages,
  blocksToText,
  createTextBlock,
} from "../components/admin/emailBlocks";
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

const fileToAttachment = (file: File): Promise<PreRegisterEmailAttachment> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve({
        filename: file.name,
        content_type: file.type,
        content: dataUrl.slice(dataUrl.indexOf(",") + 1),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

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
  const [blocks, setBlocks] = useState<EmailBlock[]>(() => [createTextBlock()]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEncoding, setIsEncoding] = useState(false);
  const [isEncodeError, setIsEncodeError] = useState(false);
  const isSending = isEncoding || isLoading;
  const content = blocksToText(blocks);

  const toConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return;
    setIsConfirming(true);
  };

  const send = async () => {
    setIsEncodeError(false);
    setIsEncoding(true);
    let attachments: PreRegisterEmailAttachment[];
    try {
      attachments = await Promise.all(
        blocksToImages(blocks).map(fileToAttachment),
      );
    } catch {
      setIsEncodeError(true);
      return;
    } finally {
      setIsEncoding(false);
    }

    mutate({
      subject: subject.trim(),
      content,
      pre_registration_id: preregistration.id,
      active_only: false,
      ...(attachments.length > 0 && { attachments }),
    });
  };

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
          <EmailBlockPreview blocks={blocks} />
        </Preview>
        {(isError || isEncodeError) && (
          <FormMessage $error>
            {isEncodeError
              ? "첨부 이미지를 읽지 못했습니다. 이미지를 다시 첨부해주세요."
              : "메일을 발송하지 못했습니다. 다시 시도해주세요."}
          </FormMessage>
        )}
        <ModalFooter>
          <SecondaryButton
            type="button"
            onClick={() => {
              reset();
              setIsEncodeError(false);
              setIsConfirming(false);
            }}
            disabled={isSending}
          >
            이전
          </SecondaryButton>
          <PrimaryButton type="button" onClick={send} disabled={isSending}>
            {isSending ? "발송 중..." : "발송"}
          </PrimaryButton>
        </ModalFooter>
      </ModalCard>
    );
  }

  return (
    <ModalCard as="form" onSubmit={toConfirm}>
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
      <Field>
        <FieldLabel as="span">본문</FieldLabel>
        <EmailBlockEditor blocks={blocks} onChange={setBlocks} />
      </Field>
      <ModalFooter>
        <SecondaryButton type="button" onClick={onClose}>
          취소
        </SecondaryButton>
        <PrimaryButton
          type="submit"
          disabled={!subject.trim() || !content.trim()}
        >
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

const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 56rem;
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
