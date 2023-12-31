import styled from "styled-components";
import Header from "../components/home/Header/Header.tsx";
import QuestionaireInput from "../components/rookie/QuestionaireInput/QuestionaireInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import UserInfoForm from "../components/rookie/UserInfoForm/UserInfoForm.tsx";
import { putResume } from "../apis/resume.ts";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  ResumeSubmissionCreate,
  UserInvitationEmails,
  UserUpdate,
} from "../types/apiTypes.ts";
import { ResumeLoaderReturnType } from "./Loader/ResumeLoader.ts";
import { patchUser, patchUserInvitationEmails } from "../apis/user.ts";

export default function Resume() {
  const { recruit_id } = useParams<{ recruit_id: string }>();
  const initialData = useLoaderData() as ResumeLoaderReturnType;
  const [resumeInput, setResumeInput] = useState(initialData.initialInputs);
  const [userInfoInput, setUserInfoInput] = useState(initialData.userInputs);

  const putResume = useSubmit(Number(recruit_id));
  const navigate = useNavigate();

  const submit = (options?: Parameters<typeof putResume>[1]) => {
    if (!checkRequired(userInfoInput)) {
      alert("필수 정보를 모두 입력하세요");
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

  return (
    <>
      <Header />
      <Main>
        <Title>자기소개서</Title>
        <Description>모든 문항에 성실히 응답해주세요.</Description>
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
        <Title>추가 정보 입력</Title>
        <Description>모든 문항은 필수 응답 항목입니다.</Description>
        <UserInfoForm
          value={userInfoInput}
          onChange={setUserInfoInput}
          ref={userInfoFormRef}
        />
        <Buttons>
          <SaveButton
            onClick={() => {
              submit({
                onSuccess: () => alert("저장되었습니다."),
                onError: () => alert("모집이 마감되었습니다."),
              });
            }}
          >
            임시저장
          </SaveButton>
          <SubmitButton
            onClick={() =>
              submit({
                onSuccess: () => {
                  alert("제출되었습니다.");
                  navigate(`/recruiting/${recruit_id}`);
                },
                onError: () => alert("모집이 마감되었습니다."),
              })
            }
          >
            제출하기
          </SubmitButton>
        </Buttons>
      </Main>
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

// const pickValidInputOnly = (
//   userInfo: UserUpdate & UserInvitationEmails,
// ): Partial<UserUpdate & UserInvitationEmails> => {
//   const validInput: Partial<UserUpdate & UserInvitationEmails> = {};
//   for (const key in userInfo) {
//     if (userInfo[key as keyof (UserUpdate & UserInvitationEmails)] !== "")
//       validInput[key as keyof (UserUpdate & UserInvitationEmails)] =
//         userInfo[key as keyof (UserUpdate & UserInvitationEmails)];
//   }
//   return validInput;
// };

const Main = styled.main`
  position: relative;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: normal;
  padding: 23vh max(calc(50vw - 53.4rem), 3rem);
`;

const Title = styled.h1`
  color: #000;
  font-size: 4rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.8rem;
`;
const Description = styled.p`
  color: #737373;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 160%; /* 2.88rem */
  letter-spacing: 0.072rem;
  margin: 0;
  margin-bottom: 4.1rem;
`;
const Questionaires = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4.1rem;
  width: 100%;
  padding: 0;
  list-style: none;
  margin-bottom: 10rem;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
`;
const SaveButton = styled.button`
  display: inline-flex;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0.5rem;
  border: none;
  background: #f0f0f0;
  color: #737373;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;

  transition: background 0.2s ease-in-out;
  &:hover {
    background: #e6e6e6;
  }
`;
const SubmitButton = styled.button`
  display: inline-flex;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0.5rem;
  border: none;
  background: #f0745f;
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;

  transition: background 0.2s ease-in-out;
  &:hover {
    background: #fff;
    color: #f0745f;
  }
`;
