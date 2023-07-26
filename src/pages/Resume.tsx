import styled from "styled-components";
import Header from "../components/rookie/Header/Header";
import QuestionaireInput from "../components/rookie/QuestionaireInput/QuestionaireInput";
import { MockResumeQuestionaire, UserInfo } from "../mocks/types/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import UserInfoForm from "../components/rookie/UserInfoForm/UserInfoForm.tsx";

export default function Resume() {
  const [resumeInput, setResumeInput] = useState<string[] | null>(null);
  const [userInfoInput, setUserInfoInput] = useUserInfo();
  const { data: results } = useQuery<MockResumeQuestionaire[]>({
    queryKey: ["resume"],
    queryFn: () =>
      fetch("/me/resume")
        .then((res) => res.json())
        .then((data) => {
          setResumeInput(
            (data as MockResumeQuestionaire[]).map(
              ({ answer }) => answer ?? "",
            ),
          );
          return data;
        }),
  });
  const submit = useSubmit();

  return (
    <Main>
      <Header />
      <Title>자기소개서</Title>
      <Description>모든 문항에 성실히 응답해주세요.</Description>
      <Questionaires>
        {results && resumeInput ? (
          results.map(({ index, question }, i) => (
            <QuestionaireInput
              key={index}
              index={index}
              question={question}
              max={500}
              value={resumeInput[i]}
              onChange={(e) => {
                setResumeInput([
                  ...resumeInput.slice(0, i),
                  e.target.value,
                  ...resumeInput.slice(i + 1),
                ]);
              }}
            />
          ))
        ) : (
          <div />
        )}
      </Questionaires>
      <Title>추가 정보 입력</Title>
      <Description>모든 문항은 필수 응답 항목입니다.</Description>
      {userInfoInput && (
        <UserInfoForm value={userInfoInput} onChange={setUserInfoInput} />
      )}
      <Buttons>
        <SaveButton>임시저장</SaveButton>
        <SubmitButton
          onClick={() => {
            if (
              resumeInput &&
              results &&
              resumeInput.length === results.length &&
              userInfoInput
            ) {
              submit({
                userInfo: userInfoInput,
                questionaire: results.map((result, i) => ({
                  ...result,
                  answer: resumeInput[i],
                })),
              });
            }
          }}
        >
          제출하기
        </SubmitButton>
      </Buttons>
    </Main>
  );
}

function useUserInfo() {
  const [userInfoInput, setUserInfoInput] = useState<UserInfo | null>(null);
  useQuery<UserInfo>({
    queryKey: ["userInfo"],
    queryFn: () =>
      fetch("/api/v1/users/me")
        .then((res) => res.json())
        .then((data: UserInfo) => {
          setUserInfoInput(data);
          return data;
        }),
  });
  return [userInfoInput, setUserInfoInput] as const;
}

function useSubmit() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data: { userInfo: UserInfo; questionaire: MockResumeQuestionaire[] }) =>
      Promise.all([
        fetch("/api/v1/users/me", {
          method: "PUT",
          body: JSON.stringify(data.userInfo),
        }),
        fetch("/me/resume", {
          method: "POST",
          body: JSON.stringify(data.questionaire),
        }),
      ]),
    {
      onSuccess: () => {
        alert("제출에 성공했습니다");
        void queryClient.invalidateQueries(["userInfo"]);
        void queryClient.invalidateQueries(["resume"]);
      },
      onError: () => {
        alert("제출에 실패했습니다");
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
