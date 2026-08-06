import { useState } from "react";
import { styled } from "styled-components";
import { ProgressList } from "../components/rookie/Progress/ProgressList";
import Header from "../components/home/Header/Header";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
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

  return (
    <>
      <Header />
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
        <Title>
          <MarkdownRenderer
            markdownString={recruiting.name}
            StyledWrapper={TitleMarkdownStyledWrapper}
          />
        </Title>
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
          <>
            {!isClosed && (
              <Caution>
                위 내용은 마감 전까지 상시 수정할 수 있으며, 모두 완료한 뒤 아래{" "}
                <em>최종 제출하기</em> 버튼을 눌러야 지원이 완료됩니다.
              </Caution>
            )}
            <ActionArea>
              {isClosed ? (
                applied ? (
                  <ResultButton
                    type="button"
                    onClick={() => navigate("./result")}
                  >
                    지원 결과 확인하기
                    <div>
                      <img
                        src="/icon/rookie/AnnounceRightArrow.svg"
                        alt="&rarr;"
                        width={20}
                      />
                      <img
                        src="/icon/rookie/AnnounceRightArrowWhite.svg"
                        alt="&rarr;"
                        width={20}
                      />
                    </div>
                  </ResultButton>
                ) : (
                  <ClosedText>지원이 마감되었습니다.</ClosedText>
                )
              ) : applied ? (
                <ActionRow>
                  <SubmitButton type="button" disabled $done>
                    최종 제출 완료
                  </SubmitButton>
                  <CancelButton
                    type="button"
                    onClick={cancelModal.openModal}
                    disabled={isPending}
                  >
                    지원 취소
                  </CancelButton>
                </ActionRow>
              ) : (
                <SubmitButton
                  type="button"
                  onClick={submitModal.openModal}
                  disabled={isPending}
                >
                  {isPending ? "제출하는 중..." : "최종 제출하기"}
                </SubmitButton>
              )}
              {errorMessage && (
                <ErrorText role="alert">{errorMessage}</ErrorText>
              )}
            </ActionArea>
          </>
        )}
      </Main>
    </>
  );
}

const Main = styled.main`
  position: relative;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: normal;
  padding: calc(6.4rem + 6rem) max(calc(50vw - 65rem), 3rem) 8rem;

  @media (max-width: 1200px) {
    padding: calc(6.4rem + 5rem) 4rem 6rem;
  }

  @media (max-width: 768px) {
    padding: calc(5.6rem + 3rem) 2rem 4rem;
  }
`;

const Title = styled.h1`
  margin: 0.9rem 0;
`;

const TitleMarkdownStyledWrapper = styled.div`
  p {
    margin: 0;
    color: #222;
    font-size: 4.6rem;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
`;

const Information = styled.div`
  margin-bottom: 3.4rem;
`;

const InformationMarkdownStyledWrapper = styled.div`
  p {
    color: #737373;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 170%; /* 3.06rem */
    letter-spacing: 0.072rem;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  code {
    color: #b44f3d;
    font-weight: 600;
  }
  ul,
  ol {
    padding: 0;
    margin: 0.4rem;
    padding-left: 2rem;
    li {
      font: inherit;
      color: #737373;
      font-size: 1.8rem;
      font-weight: 400;
      line-height: 170%; /* 3.06rem */
      letter-spacing: 0.072rem;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }
`;

const Caution = styled.p`
  margin: 2.5rem 0 0;
  color: #515151;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 160%; /* 2.88rem */
  letter-spacing: 0.072rem;

  em {
    font-style: normal;
    font-weight: 600;
    color: #222;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ClosedText = styled.p`
  margin: 0;
  color: #515151;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.072rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  margin-top: 3.2rem;
`;

const SubmitButton = styled.button<{ $done?: boolean }>`
  box-sizing: border-box;
  width: 32rem;
  padding: 1.8rem;
  background: #f0745f;
  border: 0.1rem solid #f0745f;
  border-radius: 0.5rem;
  color: #fff;
  font-family: inherit;
  font-size: 2.2rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:enabled {
    background: #e05c46;
    border-color: #e05c46;
  }

  &:disabled {
    cursor: default;
    background: ${(props) => (props.$done ? "#fff" : "#c4c4c4")};
    border-color: ${(props) => (props.$done ? "#64cb3f" : "#c4c4c4")};
    color: ${(props) => (props.$done ? "#45b61d" : "#fff")};
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.8rem;
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ResultButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #f0745f;
  border: #f0745f 0.1rem solid;
  border-radius: 0.5rem;
  color: #fff;
  font-family: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.5rem;
  cursor: pointer;

  > div {
    width: 2.5rem;
    height: 2.5rem;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    > img:last-child {
      display: none;
    }
  }

  &:hover {
    color: #f0745f;
    background: #fff;
    > div {
      background: #f0745f;
      > img:first-child {
        display: none;
      }
      > img:last-child {
        display: inline;
      }
    }
  }
`;

const CancelButton = styled.button`
  padding: 1rem 2rem;
  background: #fff;
  border: 0.1rem solid #d1d1d1;
  border-radius: 0.5rem;
  color: #737373;
  font-family: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.5rem;
  cursor: pointer;

  &:hover:enabled {
    border-color: #737373;
    color: #515151;
  }

  &:disabled {
    cursor: default;
    color: #c4c4c4;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 160%;
  color: #f0745f;
  white-space: pre-line;
`;
