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
  const { problem_number } = useParams();
  return <SolveProblem key={problem_number} />;
}

function SolveProblem() {
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
  const [editorRevision, setEditorRevision] = useState(0);
  const codeRef = useCodeRef(language, problemNumber);

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

  const handleSubmit = async () => {
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
        is_example: false,
        extra_testcases: [],
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
    setEditorRevision((revision) => revision + 1);
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
      <ProblemTabs
        recruitId={recruitId}
        recruitingName={recruiting?.name}
        problems={problemTabs}
        currentProblemId={problemNumber}
        judgingProblemId={isSubmitting ? problemNumber : undefined}
      />
      <Main>
        <Row $collapseLeft={isFullScreen}>
          <Col>
            <ProblemDescription
              problemNumber={problem.num}
              problemMarkdown={problem.body}
              defaultTestCases={problem.testcases.map((t) => ({
                input: t.stdin,
                output: t.expected_output,
              }))}
            />
          </Col>
          <Col>
            <CodeEditor
              key={editorRevision}
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
                isSubmitting={isSubmitting}
                results={testResults}
                error={submitError}
                ulRef={testConsoleRef}
              />
            </DragResizable>
          </Col>
        </Row>
      </Main>
      <BottomNav>
        <NoticeArea>
          {actionError ? (
            <ErrorText role="alert">{actionError}</ErrorText>
          ) : (
            <NoticeText>
              메인 리크루팅 페이지에서 <em>최종 제출하기</em> 버튼을 눌러야
              지원이 완료됩니다.
            </NoticeText>
          )}
        </NoticeArea>
        <Buttons>
          <ResetButton type="button" onClick={resetModal.openModal}>
            코드 초기화
          </ResetButton>
          <SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "채점 중..." : "제출하기"}
          </SubmitButton>
        </Buttons>
      </BottomNav>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black[100]};

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  min-height: 0;
  padding: 2.4rem 3.2rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const Row = styled.div<{ $collapseLeft?: boolean }>`
  display: flex;
  flex: 1;
  gap: ${(props) => (props.$collapseLeft ? "0" : "2.4rem")};
  min-height: 0;
  min-width: 0;

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
    gap: 1.2rem;

    & > :first-child {
      flex: none;
      max-height: 50vh;
      opacity: 1;
    }

    & > :last-child {
      min-height: 60vh;
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
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1.2rem 1.6rem;
  padding: 1.2rem 3.2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.black[200]};
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    padding: 1.4rem 1.6rem;
  }
`;

const NoticeArea = styled.div`
  flex: 0 1 auto;
  min-width: 0;
  text-align: right;

  @media (max-width: 768px) {
    flex-basis: 100%;
    text-align: left;
  }
`;

const NoticeText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  line-height: ${({ theme }) => theme.lineHeights.base};

  em {
    font-style: normal;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.pink};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  white-space: pre-line;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      flex: 1;
    }
  }
`;

const BaseButton = styled.button`
  padding: 1rem 1.8rem;
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const ResetButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;

const SubmitButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};

  &:hover:enabled {
    border-color: ${({ theme }) => theme.colors.black[700]};
    background-color: ${({ theme }) => theme.colors.black[700]};
  }
`;
