import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getProblemById,
  getProblemSubmissionV2,
  postProblemSubmissionV2,
} from "../apis/problem.ts";
import CodeEditor from "../components/solve/CodeEditor/index.tsx";
import { useCodeRef } from "../components/solve/CodeEditor/useCode.tsx";
import {
  boilerplates,
  languageCodesV2,
  useLanguage,
} from "../components/solve/CodeEditor/useLanguage.tsx";
import DragResizable from "../components/solve/DragResizable.tsx";
import ProblemDescription from "../components/solve/ProblemDescription/ProblemDescription.tsx";
import { useCustomTestCases } from "../components/solve/ProblemDescription/useCustomTestCases.tsx";
import TestResultConsole from "../components/solve/TestResultConsoleV2.tsx";
import { unreachable } from "../lib/unreachable.ts";
import { ProblemSubmissionResultV2 } from "../types/apiTypes.ts";

export default function Solve() {
  const params = useParams();
  const queryClient = useQueryClient();
  const problemNumber = Number(params.problem_number);
  const {
    data: problem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["problem", problemNumber],
    queryFn: () => getProblemById(problemNumber),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [language, setLanguage] = useLanguage();
  // const [code, setCode] = useCode(language, problemNumber);
  const codeRef = useCodeRef(language, problemNumber);
  const [customTestcases, setCustomTestcases] =
    useCustomTestCases(problemNumber);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<ProblemSubmissionResultV2[]>(
    [],
  );
  const [submitError, setSubmitError] = useState<string[]>([]);
  const testConsoleRef = useRef<HTMLUListElement>(null);

  const handleSubmit = async (is_example: boolean) => {
    if (!codeRef.current) {
      alert("코드를 입력해주세요");
      return;
    }

    queryClient.invalidateQueries(["recruiting"]);
    setIsSubmitting(true);
    setTestResults([]);
    setSubmitError([]);
    const res = postProblemSubmissionV2({
      problem_id: problemNumber,
      language: languageCodesV2[language],
      source_code: codeRef.current,
      is_example,
      extra_testcases: is_example
        ? customTestcases.map((t) => ({
            stdin: t.input,
            expected_output: t.output,
          }))
        : [],
    }).catch((e: Response) => {
      return e.json().then((data: { detail?: string }) => {
        if (data.detail) throw Error(data.detail);
        else {
          throw Error("코드 제출에 실패했습니다. 운영팀에게 문의해주세요.");
        }
      });
    });
    res
      .then(() => getProblemSubmissionV2(problemNumber))
      .then(async (res) => {
        for await (const { data, type } of res) {
          switch (type) {
            case "skip":
              break;
            case "message":
              flushSync(() => {
                setTestResults((prev) => [...prev, ...data.items]);
              });
              if (testConsoleRef.current) {
                testConsoleRef.current.lastElementChild?.scrollIntoView({
                  behavior: "smooth",
                });
              }
              break;
            case "error":
              console.log(data);
              flushSync(() => {
                setSubmitError((prev) => [...prev, data.detail]);
              });
              if (testConsoleRef.current) {
                testConsoleRef.current.lastElementChild?.scrollIntoView({
                  behavior: "smooth",
                });
              }
              break;
            case "unknown":
              console.error(`Unknown data: ${data}`);
              break;
            default:
              unreachable(type);
          }
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("채점 결과 조회에 실패했습니다. 운영팀에게 문의 바랍니다.");
        }
      });
    setIsSubmitting(false);
  };

  /**
   * @TODO 에러처리
   */

  if (isLoading) {
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
                code={codeRef.current}
                setCode={(newCode) => {
                  codeRef.current = newCode;
                }}
                language={language}
                setLanguage={setLanguage}
              />
              <DragResizable initialHeight={300}>
                <TestResultConsole
                  results={testResults}
                  error={submitError}
                  ulRef={testConsoleRef}
                />
              </DragResizable>
            </Col>
            <BottomNav>
              <SubmitButton
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
                $primary
              >
                제출하기
              </SubmitButton>
              <SubmitButton onClick={() => handleSubmit(true)} disabled={true}>
                테스트 실행
              </SubmitButton>
              <SubmitButton
                onClick={() => {
                  if (!confirm("정말로 코드를 초기화하시겠습니까?")) return;
                  codeRef.current = boilerplates[language];
                }}
              >
                코드 초기화
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
  padding: 3rem;
  box-sizing: border-box;
  background: #fff7e9;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
  overflow: hidden;
  border: 0.4rem solid #373737;
  box-shadow: 1rem 1rem #373737;
  border-radius: 0.5rem;
  background: white;
`;
const TopNav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1.4rem;
  background: #f0745f;
  border-bottom: 0.4rem solid #373737;

  a {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: bold;
    font-size: 1.6rem;
    color: #000000;
    text-decoration: none;
  }
`;
const Row = styled.div<{ $collapseLeft?: boolean }>`
  display: flex;
  flex: 1;
  gap: ${(props) => (props.$collapseLeft ? "0" : "1.6rem")};
  padding: 0 1.6rem 1.6rem;
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
  gap: 1.6rem;
  padding: 1.6rem 0 0;
`;
const SubmitButton = styled.button<{ $primary?: boolean }>`
  padding: 0.9rem 2rem;
  border: 0.4rem solid #373737;
  border-radius: 0.5rem;
  box-shadow: 0.4rem 0.4rem #323232;
  font-size: 1.8rem;
  background: ${(props) => (props.$primary ? "#f0745f" : "#ededed")};
  cursor: pointer;
  &:active {
    box-shadow: 0.2rem 0.2rem #323232;
    transform: translate(0.2rem, 0.2rem);
  }
  &:disabled {
    background: #c4c4c4;
  }
`;
