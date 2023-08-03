import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ProblemDescription from "../components/solve/ProblemDescription/ProblemDescription.tsx";
import CodeEditor from "../components/solve/CodeEditor";
import TestResultConsole from "../components/solve/TestResultConsole.tsx";
import DragResizable from "../components/solve/DragResizable.tsx";
import { useState } from "react";
import { useQuery } from "react-query";
import { getProblemById, postProblemSubmission } from "../apis/problem.ts";
import {
  languageCodes,
  useLanguage,
} from "../components/solve/CodeEditor/useLanguage.tsx";
import { useCode } from "../components/solve/CodeEditor/useCode.tsx";
import { useCustomTestCases } from "../components/solve/ProblemDescription/useCustomTestCases.tsx";
import { ProblemSubmissionResult } from "../types/apiTypes.ts";
import { unreachable } from "../lib/unreachable.ts";

export default function Solve() {
  const params = useParams();
  const problemNumber = Number(params.problem_number);
  const {
    data: problem,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryKey: ["problem", problemNumber],
    queryFn: () => getProblemById(problemNumber),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [language, setLanguage] = useLanguage();
  const [code, setCode] = useCode(language);
  const [customTestcases, setCustomTestcases] =
    useCustomTestCases(problemNumber);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<ProblemSubmissionResult[]>([]);

  const handleSubmit = async (is_example: boolean) => {
    if (!code) {
      alert("코드를 입력해주세요");
      return;
    }
    setIsSubmitting(true);
    setTestResults([]);
    const res = postProblemSubmission({
      problem_id: problemNumber,
      language: languageCodes[language],
      source_code: code,
      is_example,
      extra_testcases: is_example
        ? []
        : customTestcases.map((t) => ({
            stdin: t.input,
            expected_output: t.output,
          })),
    });
    try {
      for await (const { data, type } of res) {
        switch (type) {
          case "skip":
            break;
          case "message":
            setTestResults((prev) => [...prev, ...data.items]);
            break;
          default:
            unreachable(type);
        }
      }
    } catch (e) {
      alert("알 수 없는 오류가 발생했습니다");
    }
    setIsSubmitting(false);
  };

  /**
   * @TODO 에러처리
   */

  if (isLoading || isIdle) {
    return <main>loading...</main>;
  }

  if (isError) {
    return <main>problem not found</main>;
  }

  return (
    <Container>
      <Main>
        <TopNav>
          <Link to={`/recruiting/${params.recruit_id}`}>
            <img src="/icon/LeftArrow.svg" alt="&larr;" width={31} />
            Back
          </Link>
        </TopNav>
        <Row $collapseLeft={isFullScreen}>
          <Col>
            <ProblemDescription
              problemNumber={problem.num}
              problemMarkdown={problem.body}
              defaultTestCases={problem.testcases.map((t) => ({
                input: t.stdin,
                output: t.expected_output,
              }))}
              customTestCases={customTestcases}
              setCustomTestCases={setCustomTestcases}
            />
          </Col>
          <Col>
            <Col>
              <CodeEditor
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
                code={code ?? ""}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
              />
              <DragResizable initialHeight={300}>
                <TestResultConsole results={testResults}></TestResultConsole>
              </DragResizable>
            </Col>
            <BottomNav>
              <SubmitButton
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                테스트 실행
              </SubmitButton>
              <SubmitButton
                onClick={() => handleSubmit(false)}
                $primary
                disabled={isSubmitting}
              >
                제출하기
              </SubmitButton>
            </BottomNav>
          </Col>
        </Row>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  background: #fff7e9;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
  border: 4px solid #373737;
  box-shadow: 10px 10px #373737;
  border-radius: 5px;
  background: white;
`;
const TopNav = styled.nav`
  display: flex;
  align-items: center;
  padding: 14px;
  background: #f0745f;
  border-bottom: 4px solid #373737;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    text-decoration: none;
  }
`;
const Row = styled.div<{ $collapseLeft?: boolean }>`
  display: flex;
  flex: 1;
  gap: ${(props) => (props.$collapseLeft ? "0" : "16px")};
  padding: 0 16px 16px;
  min-height: 0;
  & > :first-child {
    ${(props) =>
      props.$collapseLeft &&
      `
      flex: 0;
      opacity: 0;`}
    transition: ease 0.3s;
  }
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;
const BottomNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px 0 0;
`;
const SubmitButton = styled.button<{ $primary?: boolean }>`
  padding: 9px 20px;
  border: 4px solid #373737;
  border-radius: 5px;
  box-shadow: 4px 4px #323232;
  font-size: 18px;
  background: ${(props) => (props.$primary ? "#f0745f" : "#ededed")};
  cursor: pointer;
  &:active {
    box-shadow: 2px 2px #323232;
    transform: translate(2px, 2px);
  }
  &:disabled {
    background: #c4c4c4;
  }
`;
