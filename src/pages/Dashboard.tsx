import { useState } from "react";
import { styled } from "styled-components";
import { ProgressList } from "../components/rookie/Progress/ProgressList";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MarkdownRenderer from "../lib/MarkdownRenderer";
import Modal from "../components/Modal/Modal";
import ConfirmModal from "../components/Modal/ConfirmModal";
import useModals from "../components/Modal/useModals";
import { resolveApiErrorMessage } from "../lib/apiErrorMessage";
import {
  DashboardLoaderReturnType,
  myResumeQuery,
  recruitingDetailQuery,
} from "./Loader/DashboardLoader.ts";
import {
  applyRecruiting,
  cancelRecruiting,
} from "../apis/recruiting/recruiting.api";
import { RecruitingType } from "../apis/recruiting/recruiting.types";
import Headerv2 from "../shared/ui/header/HeaderV2";
import HeaderSpacer from "../shared/ui/header/HeaderSpacer";
import { PositionTag, StatusTag } from "../shared/ui/tag/Tag";
import { PATH } from "../shared/routes/constants";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const initialData = useLoaderData() as DashboardLoaderReturnType;
  const recruitId = Number(params.recruit_id);

  const { data: recruiting } = useQuery({
    ...recruitingDetailQuery(recruitId),
    initialData: initialData.recruiting,
  });
  const { data: resume } = useQuery({
    ...myResumeQuery(recruitId),
    initialData: initialData.resume,
  });

  const [submitModal, cancelModal] = useModals(2);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const isProgrammer = recruiting.type === RecruitingType.PROGRAMMER;
  const applied = recruiting.applied;
  const isClosed =
    !recruiting.is_active ||
    (recruiting.to_date !== undefined &&
      recruiting.to_date !== null &&
      new Date(recruiting.to_date).getTime() <= Date.now());

  const refetchRecruiting = () =>
    Promise.all([
      queryClient.invalidateQueries(["recruiting"]),
      queryClient.invalidateQueries(["resume"]),
      queryClient.invalidateQueries(["user"]),
    ]);

  const handleApply = () => {
    submitModal.closeModal();
    setIsPending(true);
    setErrorMessage(null);
    applyRecruiting(recruiting.id)
      .then(() => refetchRecruiting())
      .catch(async (error: unknown) => {
        setErrorMessage(
          await resolveApiErrorMessage(
            error,
            "최종 제출에 실패했습니다. 잠시 후 다시 시도해주세요.",
          ),
        );
      })
      .finally(() => setIsPending(false));
  };

  const handleCancel = () => {
    cancelModal.closeModal();
    setIsPending(true);
    setErrorMessage(null);
    cancelRecruiting(recruiting.id)
      .then(() => refetchRecruiting())
      .catch(async (error: unknown) => {
        setErrorMessage(
          await resolveApiErrorMessage(
            error,
            "지원 취소에 실패했습니다. 잠시 후 다시 시도해주세요.",
          ),
        );
      })
      .finally(() => setIsPending(false));
  };

  const arrowIcon = (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );

  return (
    <>
      <Headerv2 />
      <HeaderSpacer />
      <Modal
        handle={submitModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
      >
        <ConfirmModal
          title="최종 제출할까요?"
          description="제출 후에도 마감 전까지는 자기소개서와 문제 풀이를 계속 수정할 수 있습니다."
          confirmLabel="최종 제출하기"
          onConfirm={handleApply}
          onClose={submitModal.closeModal}
        />
      </Modal>
      <Modal
        handle={cancelModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
      >
        <ConfirmModal
          title="지원을 취소할까요?"
          description="입력한 자기소개서와 문제 제출 내역이 모두 삭제되며 되돌릴 수 없습니다."
          confirmLabel="지원 취소하기"
          onConfirm={handleCancel}
          onClose={cancelModal.closeModal}
          irreversible
        />
      </Modal>
      <Main>
        <Content>
          <Heading>
            <BackLink to={PATH.RECRUITING_LIST}>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              리크루팅 목록
            </BackLink>
            <PositionTag type={recruiting.type} />
            <Title>
              <MarkdownRenderer
                markdownString={recruiting.name}
                StyledWrapper={TitleMarkdownStyledWrapper}
              />
            </Title>
          </Heading>
          <Information>
            <MarkdownRenderer
              markdownString={recruiting.description}
              StyledWrapper={InformationMarkdownStyledWrapper}
            />
          </Information>
          <ProgressList
            recruiting={recruiting}
            hasResume={resume.items.length > 0}
            type={recruiting.type}
          />
          {!isProgrammer && (
            <SubmitPanel>
              <SubmitText>
                {isClosed ? (
                  <strong>지원이 마감되었습니다.</strong>
                ) : applied ? (
                  <>
                    <strong>
                      <StatusTag $variant="done">최종 제출 완료</StatusTag>
                    </strong>
                    <p>
                      제출 후에도 마감 전까지는 자기소개서와 문제 풀이를 계속
                      수정할 수 있습니다.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>
                      모두 완료한 뒤 최종 제출하기 버튼을 눌러야 지원이
                      완료됩니다.
                    </strong>
                    <p>위 내용은 마감 전까지 상시 수정할 수 있습니다.</p>
                  </>
                )}
                {errorMessage && (
                  <ErrorText role="alert">{errorMessage}</ErrorText>
                )}
              </SubmitText>
              {isClosed ? (
                applied && (
                  <ResultButton
                    type="button"
                    onClick={() => navigate("./result")}
                  >
                    지원 결과 확인하기
                    {arrowIcon}
                  </ResultButton>
                )
              ) : applied ? (
                <CancelButton
                  type="button"
                  onClick={cancelModal.openModal}
                  disabled={isPending}
                >
                  지원 취소
                </CancelButton>
              ) : (
                <SubmitButton
                  type="button"
                  onClick={submitModal.openModal}
                  disabled={isPending}
                >
                  {isPending ? "제출하는 중..." : "최종 제출하기"}
                </SubmitButton>
              )}
            </SubmitPanel>
          )}
        </Content>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 7.2rem 2rem 10.4rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem 7.2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 100rem;

  @media (max-width: 768px) {
    gap: 3.2rem;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const TitleMarkdownStyledWrapper = styled.div`
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.black[900]};
    font-size: ${({ theme }) => theme.fontSizes[32]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes[24]};
    }
  }
`;

const Information = styled.div`
  padding: 2.8rem 3.2rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.black[100]};

  @media (max-width: 768px) {
    padding: 2rem 2.4rem;
  }
`;

const InformationMarkdownStyledWrapper = styled.div`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 1.7;

  p {
    margin: 0;
  }
  p + p {
    margin-top: 0.6rem;
  }
  code {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
  ul,
  ol {
    margin: 0.4rem 0;
    padding-left: 2rem;
    list-style: disc;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;

const SubmitPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  padding: 2.8rem 3.2rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 2.4rem;
  }
`;

const SubmitText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;

  strong {
    font-size: ${({ theme }) => theme.fontSizes[18]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.base};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.black[300]};
    font-size: ${({ theme }) => theme.fontSizes[14]};
    line-height: ${({ theme }) => theme.lineHeights.base};
  }
`;

const ErrorText = styled.p`
  && {
    color: ${({ theme }) => theme.colors.pink};
    white-space: pre-line;
  }
`;

const PanelButton = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem 1.8rem;
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const SubmitButton = styled(PanelButton)`
  border: 1px solid ${({ theme }) => theme.colors.pink};
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[18]};

  &:hover:enabled {
    opacity: 0.85;
  }
`;

const CancelButton = styled(PanelButton)`
  border: 1px solid ${({ theme }) => theme.colors.black[700]};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black[300]};

  &:hover:enabled {
    border-color: ${({ theme }) => theme.colors.black[300]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ResultButton = styled(PanelButton)`
  border: 1px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;
