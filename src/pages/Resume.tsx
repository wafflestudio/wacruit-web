import styled from "styled-components";
import QuestionaireInput from "../components/rookie/QuestionaireInput/QuestionaireInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import UserInfoForm from "../components/rookie/UserInfoForm/UserInfoForm.tsx";
import { putResume } from "../apis/resume/resume.api";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { ResumeSubmissionCreate } from "../apis/resume/resume.types";
import { UserInvitationEmails, UserUpdate } from "../apis/user/user.types";
import { ResumeLoaderReturnType } from "./Loader/ResumeLoader.ts";
import { patchUser, patchUserInvitationEmails } from "../apis/user/user.api";
import Modal from "../components/Modal/Modal.tsx";
import AlertModal from "../components/Modal/AlertModal.tsx";
import useModals from "../components/Modal/useModals.tsx";
import { resolveApiErrorMessage } from "../lib/apiErrorMessage.ts";
import Headerv2 from "../shared/ui/header/HeaderV2";
import HeaderSpacer from "../shared/ui/header/HeaderSpacer";
import { CREATE_PATH } from "../shared/routes/constants";

type Alert = { title: string; description?: string };

export default function Resume() {
  const { recruit_id } = useParams<{ recruit_id: string }>();
  const initialData = useLoaderData() as ResumeLoaderReturnType;
  const [resumeInput, setResumeInput] = useState(initialData.initialInputs);
  const [userInfoInput, setUserInfoInput] = useState(initialData.userInputs);

  const putResume = useSubmit(Number(recruit_id));

  const [alertModal] = useModals(1);
  const [alertContent, setAlertContent] = useState<Alert | null>(null);

  const openAlert = (content: Alert) => {
    setAlertContent(content);
    alertModal.openModal();
  };

  const closeAlert = () => {
    alertModal.closeModal();
  };

  const submit = (options?: Parameters<typeof putResume>[1]) => {
    if (!checkRequired(userInfoInput)) {
      openAlert({
        title: "필수 정보를 모두 입력해주세요.",
        description: "추가 정보 입력의 모든 항목은 필수 응답 항목입니다.",
      });
      return;
    }

    if (userInfoFormRef.current?.reportValidity()) {
      putResume(
        {
          questionaire: resumeInput
            .filter((pureInput) => pureInput.answer.length > 0)
            .map((input) => ({
              question_id: input.question_id,
              answer: input.answer,
            })),
          userInfo: {
            university: userInfoInput.university,
            college: userInfoInput.college,
            department: userInfoInput.department,
          },
          invitation: {
            github_email: userInfoInput.github_email,
            slack_email: userInfoInput.slack_email,
            notion_email: userInfoInput.notion_email,
          },
        },
        options,
      );
    }
  };

  const userInfoFormRef = useRef<HTMLFormElement>(null);

  const dashboardPath = CREATE_PATH.RECRUITING_DETAIL({
    recruitId: Number(recruit_id),
  });

  return (
    <>
      <Headerv2 />
      <HeaderSpacer />
      <Modal
        handle={alertModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
        onBackgroundClicked={closeAlert}
      >
        {alertContent && (
          <AlertModal
            title={alertContent.title}
            description={alertContent.description}
            onClose={closeAlert}
          />
        )}
      </Modal>
      <Main>
        <Content>
          <Heading>
            <BackLink to={dashboardPath}>
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
              지원 현황
            </BackLink>
            <Title>자기소개서</Title>
            <Description>모든 문항에 성실히 응답해주세요.</Description>
          </Heading>
          <Questionaires>
            {resumeInput.map(
              (
                {
                  question_id,
                  question_num,
                  question_content,
                  content_limit,
                  answer,
                },
                i,
              ) => (
                <QuestionaireInput
                  key={question_id}
                  index={question_num}
                  question={question_content}
                  max={content_limit}
                  value={answer}
                  onChange={(e) => {
                    const copy = [...resumeInput];
                    copy[i] = { ...copy[i], answer: e.target.value };
                    setResumeInput(copy);
                  }}
                />
              ),
            )}
          </Questionaires>
          <Divider />
          <Heading>
            <SubTitle>추가 정보 입력</SubTitle>
            <Description>모든 문항은 필수 응답 항목입니다.</Description>
          </Heading>
          <UserInfoForm
            value={userInfoInput}
            onChange={setUserInfoInput}
            ref={userInfoFormRef}
          />
        </Content>
      </Main>
      <SaveBar>
        <SaveBarInner>
          <OutlineButton to={dashboardPath}>지원 현황으로</OutlineButton>
          <SubmitButton
            type="button"
            onClick={() =>
              submit({
                onSuccess: () =>
                  openAlert({
                    title: "저장되었습니다.",
                    description:
                      "마감 전까지 언제든 이어서 작성할 수 있습니다.",
                  }),
                onError: (error) =>
                  void resolveApiErrorMessage(
                    error,
                    "저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
                  ).then((message) => openAlert({ title: message })),
              })
            }
          >
            저장하기
          </SubmitButton>
        </SaveBarInner>
      </SaveBar>
    </>
  );
}

function useSubmit(recruiting_id: number) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data: {
      questionaire: ResumeSubmissionCreate[];
      userInfo: UserUpdate;
      invitation: UserInvitationEmails;
    }) =>
      Promise.all([
        patchUser({
          university: data.userInfo.university,
          college: data.userInfo.college,
          department: data.userInfo.department,
        }),
        patchUserInvitationEmails({
          github_email: data.invitation.github_email,
          notion_email: data.invitation.notion_email,
          slack_email: data.invitation.slack_email,
        }),
        putResume(recruiting_id, data.questionaire),
      ]),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["user", "information"]);
        void queryClient.invalidateQueries(["user", "invitation"]);
        void queryClient.invalidateQueries(["resume", "answer"]);
        void queryClient.invalidateQueries(["recruiting", "detail"]);
      },
    },
  );
  return mutate;
}

const checkRequired = (
  userInfo: UserUpdate & UserInvitationEmails,
): boolean => {
  for (const key in userInfo) {
    if (!userInfo[key as keyof (UserUpdate & UserInvitationEmails)])
      return false;
  }
  return true;
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 7.2rem 2rem 8rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem 6rem;
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
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[24]};
  }
`;

const SubTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[24]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[20]};
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const Questionaires = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background-color: ${({ theme }) => theme.colors.black[200]};
`;

const SaveBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  padding: 1.4rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.black[200]};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SaveBarInner = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  max-width: 100rem;

  > * {
    @media (max-width: 768px) {
      flex: 1;
    }
  }
`;

const buttonBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.8rem;
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
`;

const OutlineButton = styled(Link)`
  ${buttonBase}
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;

const SubmitButton = styled.button`
  ${buttonBase}
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    border-color: ${({ theme }) => theme.colors.black[700]};
    background-color: ${({ theme }) => theme.colors.black[700]};
  }
`;
