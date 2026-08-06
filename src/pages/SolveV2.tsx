import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getProblemById,
  getProblemSubmissionV2,
  postProblemSubmissionV2,
} from "../apis/problem/problem.api";
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
import ProblemTabs from "../components/solve/ProblemTabs.tsx";
import TestResultConsole from "../components/solve/TestResultConsoleV2.tsx";
import Modal from "../components/Modal/Modal.tsx";
import ConfirmModal from "../components/Modal/ConfirmModal.tsx";
import useModals from "../components/Modal/useModals.tsx";
import { recruitingDetailQuery } from "./Loader/DashboardLoader.ts";
import { resolveApiErrorMessage } from "../lib/apiErrorMessage.ts";
import { unreachable } from "../lib/unreachable.ts";
import { ProblemSubmissionResultV2 } from "../apis/problem/problem.types";

export default function Solve() {
  const params = useParams();
  const queryClient = useQueryClient();
  const problemNumber = Number(params.problem_number);
  const recruitId = Number(params.recruit_id);
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
  const { data: recruiting } = useQuery({
    ...recruitingDetailQuery(recruitId),
    enabled: !Number.isNaN(recruitId),
    retry: 0,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [language, setLanguage] = useLanguage();
  const [isCodeInitialized, setIsCodeInitialized] = useState(true);
  const codeRef = useCodeRef(language, problemNumber);
  const [customTestcases, setCustomTestcases] =
    useCustomTestCases(problemNumber);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<ProblemSubmissionResultV2[]>(
    [],
  );
  const [submitError, setSubmitError] = useState<string[]>([]);
  const [actionError, setActionError] = useState<string | null>(null);
  const testConsoleRef = useRef<HTMLUListElement>(null);
  const [resetModal] = useModals(1);

  const problemTabs = [...(recruiting?.problem_status ?? [])].sort(
    (a, b) => a.num - b.num,
  );

  const handleSubmit = async (is_example: boolean) => {
    if (!codeRef.current) {
      setActionError("코드를 입력해주세요.");
      return;
    }

    setActionError(null);
    setIsSubmitting(true);
    queryClient.invalidateQueries(["recruiting"]);
    setTestResults([]);
    setSubmitError([]);

    try {
      await postProblemSubmissionV2({
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
      });
    } catch (e) {
      setActionError(
        await resolveApiErrorMessage(
          e,
          "코드 제출에 실패했습니다. 운영팀에게 문의해주세요.",
        ),
      );
      setIsSubmitting(false);
      return;
    }

    try {
      for await (const { data, type } of getProblemSubmissionV2(
        problemNumber,
      )) {
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
    } catch (e) {
      setActionError(
        await resolveApiErrorMessage(
          e,
          "채점 결과 조회에 실패했습니다. 운영팀에게 문의 바랍니다.",
        ),
      );
    } finally {
      setIsSubmitting(false);
      queryClient.invalidateQueries(["recruiting"]);
    }
  };

  const handleResetCode = () => {
    resetModal.closeModal();
    codeRef.current = boilerplates[language];
    setIsCodeInitialized(true);
    setActionError(null);
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
      <Modal
        handle={resetModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
      >
        <ConfirmModal
          title="코드를 초기화할까요?"
          description="작성한 코드가 모두 지워지고 기본 코드로 되돌아갑니다."
          confirmLabel="초기화하기"
          onConfirm={handleResetCode}
          onClose={resetModal.closeModal}
        />
      </Modal>
      <Main>
        <ProblemTabs
          recruitId={recruitId}
          problems={problemTabs}
          currentProblemId={problemNumber}
          judgingProblemId={isSubmitting ? problemNumber : undefined}
        />
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
                  setIsCodeInitialized(false);
                  codeRef.current = newCode;
                }}
                language={language}
                setLanguage={setLanguage}
              />
              <DragResizable initialHeight={300}>
                <TestResultConsole
                  isSubmitting={isSubmitting}
                  results={testResults}
                  error={submitError}
                  ulRef={testConsoleRef}
                />
              </DragResizable>
            </Col>
            <BottomNav>
              <NoticeArea>
                {actionError ? (
                  <ErrorText role="status">{actionError}</ErrorText>
                ) : (
                  <NoticeText>
                    메인 리크루팅 페이지에서 <em>최종 제출하기</em> 버튼을
                    눌러야 지원이 완료됩니다.
                  </NoticeText>
                )}
              </NoticeArea>
              <Buttons>
                <SubmitButton
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  $primary
                >
                  {isSubmitting ? "채점 중..." : "제출하기"}
                </SubmitButton>
                {/* <SubmitButton
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                테스트 실행
              </SubmitButton> */}
                <SubmitButton
                  onClick={resetModal.openModal}
                  disabled={isCodeInitialized}
                >
                  코드 초기화
                </SubmitButton>
              </Buttons>
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

  @media (max-width: 1200px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding: 1.2rem;
  }
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  border: 0.4rem solid #373737;
  box-shadow: 1rem 1rem #373737;
  border-radius: 0.5rem;
  background: white;

  @media (max-width: 768px) {
    box-shadow: 0.5rem 0.5rem #373737;
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.6rem;
    padding: 0 1rem 1rem;

    & > :first-child {
      flex: none;
      max-height: 50vh;
      opacity: 1;
    }
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
  flex-wrap: wrap;
  gap: 1.2rem 1.6rem;
  padding: 1.6rem 0 0;
`;
const NoticeArea = styled.div`
  flex: 1 1 20rem;
  min-width: 0;
  text-align: right;
`;
const NoticeText = styled.p`
  margin: 0;
  color: #737373;
  font-size: 1.4rem;
  line-height: 150%;

  em {
    font-style: normal;
    font-weight: 700;
    color: #373737;
  }
`;
const ErrorText = styled.p`
  margin: 0;
  color: #c7382a;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 150%;
  white-space: pre-line;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
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
