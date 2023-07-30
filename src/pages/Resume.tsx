import styled from "styled-components";
import Header from "../components/rookie/Header/Header";
import QuestionaireInput from "../components/rookie/QuestionaireInput/QuestionaireInput";
import { UserInfo } from "../mocks/types/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRef, useState } from "react";
import UserInfoForm from "../components/rookie/UserInfoForm/UserInfoForm.tsx";
import { getMyResumes, getQuestions, putResume } from "../apis/resume.ts";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, patchUser } from "../apis/user.ts";
import { ResumeSubmissionCreate } from "../types/apiTypes.ts";

export default function Resume() {
  const { recruit_id } = useParams<{ recruit_id: string }>();
  const questions = useQuery({
    queryKey: ["resume/question"],
    queryFn: () => getQuestions(Number(recruit_id)),
  });
  const [resumeInput, setResumeInput] = useState<string[] | null>(null);
  const [userInfoInput, setUserInfoInput] = useUserInfo();
  const resume = useQuery({
    queryKey: ["resume"],
    queryFn: () =>
      getMyResumes(Number(recruit_id)).then((data) => {
        setResumeInput(data.items.map(({ answer }) => answer ?? ""));
        return data;
      }),
  });
  const putResume = useSubmit(Number(recruit_id));
  const navigate = useNavigate();
  const submit = (options?: Parameters<typeof putResume>[1]) => {
    if (
      resumeInput &&
      resume.data &&
      userInfoInput &&
      userInfoFormRef.current?.reportValidity()
    ) {
      putResume(
        {
          userInfo: userInfoInput,
          questionaire: resume.data.items.map((result, i) => ({
            ...result,
            answer: resumeInput[i],
          })),
        },
        options,
      );
    }
  };

  const userInfoFormRef = useRef<HTMLFormElement>(null);

  return (
    <Main>
      <Header />
      <Title>자기소개서</Title>
      <Description>모든 문항에 성실히 응답해주세요.</Description>
      <Questionaires>
        {questions.data && resumeInput ? (
          questions.data.items.map(
            ({ question_num, content, content_limit }, i) => (
              <QuestionaireInput
                index={question_num}
                question={content}
                max={content_limit}
                value={resumeInput[i]}
                onChange={(e) => {
                  const copy = [...resumeInput];
                  copy[i] = e.target.value;
                  setResumeInput(copy);
                }}
              />
            ),
          )
        ) : (
          <div />
        )}
      </Questionaires>
      <Title>추가 정보 입력</Title>
      <Description>모든 문항은 필수 응답 항목입니다.</Description>
      {userInfoInput && (
        <UserInfoForm
          value={userInfoInput}
          onChange={setUserInfoInput}
          ref={userInfoFormRef}
        />
      )}
      <Buttons>
        <SaveButton
          onClick={() => {
            submit({
              onSuccess: () => alert("저장되었습니다."),
              onError: () => alert("오류가 발생했습니다."),
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
              onError: () => alert("오류가 발생했습니다."),
            })
          }
        >
          제출하기
        </SubmitButton>
      </Buttons>
    </Main>
  );
}

function useUserInfo() {
  const [userInfoInput, setUserInfoInput] = useState<UserInfo | null>(null);
  useQuery({
    queryKey: ["userInfo"],
    queryFn: () =>
      getUser().then((data) => {
        setUserInfoInput({
          admission: "",
          college: data.college,
          githubId: data.github_email,
          major: data.department,
          notionEmail: data.notion_email,
          slackEmail: data.slack_email,
          status: "",
          university: data.university,
        });
        return data;
      }),
  });
  return [userInfoInput, setUserInfoInput] as const;
}

function useSubmit(recruiting_id: number) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data: { userInfo: UserInfo; questionaire: ResumeSubmissionCreate[] }) =>
      Promise.all([
        patchUser({
          college: data.userInfo.college,
          department: data.userInfo.major,
          github_email: data.userInfo.githubId,
          notion_email: data.userInfo.notionEmail,
          slack_email: data.userInfo.slackEmail,
          university: data.userInfo.university,
        }),
        putResume(recruiting_id, data.questionaire),
      ]),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userInfo"]);
        void queryClient.invalidateQueries(["resume"]);
        void queryClient.invalidateQueries(["recruit"]);
      },
    },
  );
  return mutate;
}

const Main = styled.main`
  position: relative;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: normal;
  padding: 23vh max(calc(50vw - 534px), 30px);
`;

const Title = styled.h1`
  color: #000;
  font-size: 40px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;
`;
const Description = styled.p`
  color: #737373;
  font-size: 18px;
  font-weight: 400;
  line-height: 160%; /* 28.8px */
  letter-spacing: 0.72px;
  margin: 0;
  margin-bottom: 41px;
`;
const Questionaires = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 41px;
  width: 100%;
  padding: 0;
  list-style: none;
  margin-bottom: 100px;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 25px;
`;
const SaveButton = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 5px;
  border: none;
  background: #f0f0f0;
  color: #737373;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  transition: background 0.2s ease-in-out;
  &:hover {
    background: #e6e6e6;
  }
`;
const SubmitButton = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 5px;
  border: none;
  background: #f0745f;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  transition: background 0.2s ease-in-out;
  &:hover {
    background: #fff;
    color: #f0745f;
  }
`;
