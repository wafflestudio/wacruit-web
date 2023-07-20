import styled from "styled-components";
import Header from "../components/rookie/Header/Header";
import QuestionaireInput from "../components/rookie/QuestionaireInput/QuestionaireInput";
import { MockResumeQuestionaire } from "../mocks/types/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";

export default function Resume() {
  const queryClient = useQueryClient();
  const [resumeInput, setResumeInput] = useState<string[] | null>(null);
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
  const { mutate } = useMutation(
    (data: MockResumeQuestionaire[]) =>
      fetch("/me/resume", { method: "POST", body: JSON.stringify(data) }),
    {
      onSuccess: () => {
        alert("제출에 성공했습니다");
        queryClient.invalidateQueries(["resume"]);
      },
      onError: () => {
        alert("제출에 실패했습니다");
      },
    },
  );

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
      <Buttons>
        <SaveButton>임시저장</SaveButton>
        <SubmitButton
          onClick={() => {
            if (
              resumeInput &&
              results &&
              resumeInput.length === results.length
            ) {
              mutate(
                results.map((result, i) => ({
                  ...result,
                  answer: resumeInput[i],
                })),
              );
            }
          }}
        >
          제출하기
        </SubmitButton>
      </Buttons>
    </Main>
  );
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
`;
