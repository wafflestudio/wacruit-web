import styled from "styled-components";
import useModal from "../../Modal/useModal";
import Modal from "../../Modal/Modal";
import { BoldText, HorizontalLine, TestCase, Text } from "./common";
import TestCaseTable from "./TestCaseTable";
import TestCaseModal from "./TestCaseModal";
import { useCallback, useMemo, useState } from "react";
import MarkDownRenderer from "../../../lib/MarkdownRenderer";

interface ProblemDescriptionProps {
  problemNumber: number;
}

export default function ProblemDescription({
  problemNumber,
}: ProblemDescriptionProps) {
  const defaultTestCases: TestCase[] = [
    { input: "4, 5", output: "a=4\nb=5" },
    { input: "4, 5", output: "a=4\nb=5" },
    { input: "4, 5", output: "a=4\nb=5" },
  ];
  const CUSTOM_TEST_CASES_KEY = `customTestCasesOfProblemNumber${problemNumber}`;
  const [customTestCases, setCustomTestCases] = useCustomTestCases(
    CUSTOM_TEST_CASES_KEY,
  );

  const deleteCustomTestCase = useCallback(
    (deleteIdx: number) =>
      setCustomTestCases((prev) => prev.filter((_, idx) => deleteIdx !== idx)),
    [setCustomTestCases],
  );

  const addNewCustomTestCase = useCallback(
    (newInputs: TestCase[]) => {
      // input & output 모두 빈칸이 아닌 데이터만 추가
      const validData: TestCase[] = newInputs.filter(
        (data) => data.input !== "" && data.output != "",
      );
      setCustomTestCases((prev: TestCase[]) => [...prev, ...validData]);
    },
    [setCustomTestCases],
  );

  const modalHandle = useModal();

  return (
    // TODO: 데이터 api 연결
    <Section>
      <Modal
        handle={modalHandle}
        modalContainerBackgroundColor={"rgba(0, 0, 0, 0.6)"}
      >
        <TestCaseModal
          addNewCustomTestCase={addNewCustomTestCase}
          deleteCustomTestCase={deleteCustomTestCase}
          onClose={modalHandle.closeModal}
          defaultTestCases={defaultTestCases}
          customTestCases={customTestCases}
        />
      </Modal>
      <ProblemTitle>문제 {problemNumber}</ProblemTitle>
      <Text>
        <MarkDownRenderer
          markdownString={`정수 a와 b가 주어집니다. 수를 입력받아 입출력 예와 같은 형식으로
          출력하는 코드를 작성해 보세요. 정수 a와 b가 주어집니다. 각 수를
          입력받아 입출력 예와 같은 형식으로 출력하는 코드를 작성해 보세요.`}
        />
      </Text>
      <HorizontalLine margin="25px 0 14px 0" />

      <BoldText>제한사항</BoldText>
      <Text>
        <MarkDownRenderer markdownString={`-100,000 ≤ a, b ≤ 100,000`} />
      </Text>
      <HorizontalLine margin="17px 0 14px 0" />

      <BoldText margin="0 0 16px 0">입출력 예시</BoldText>
      <TestCaseTable
        defaultTestCases={defaultTestCases}
        customTestCases={customTestCases}
        deleteCustomTestCase={deleteCustomTestCase}
      />
      <AddTestCaseButton
        onClick={() => {
          modalHandle.openModal();
        }}
      >
        <img src="/icon/AddTestCase.svg" alt="+" />
        <Text as="div">테스트 케이스 추가하기</Text>
      </AddTestCaseButton>
    </Section>
  );
}

/* code start: 커스텀 테스트 케이스도 localStorage에 저장하며 사용한다 */

function useCustomTestCases(customTestCasesKey: string) {
  const storedCustomTestCases: TestCase[] = useMemo(
    () => JSON.parse(localStorage.getItem(customTestCasesKey) || "[]"),
    [customTestCasesKey],
  );

  const [customTestCases, setCustomTestCases] = useState<TestCase[]>(
    storedCustomTestCases,
  );

  const setCustomTestCasesWithLocalStorage = useCallback(
    (param: TestCase[] | ((prev: TestCase[]) => TestCase[])) => {
      const newTestCases: TestCase[] =
        typeof param === "function" ? param(customTestCases) : param;
      setCustomTestCases(newTestCases);
      localStorage.setItem(customTestCasesKey, JSON.stringify(newTestCases));
    },
    [customTestCases, customTestCasesKey],
  );
  return [customTestCases, setCustomTestCasesWithLocalStorage] as const;
}
/* end */

const Section = styled.section`
  border: 4px solid #373737;
  border-radius: 5px;
  padding: 28px 26px;
  overflow-y: auto;

  /* code start: scrollbar css design */
  &::-webkit-scrollbar {
    width: 17px; // border-left 5px, border-right 5px를 뺀 7px가 보이는 두께
  }
  &::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 10px;
    border: 5px solid #fff; // 컨텐츠 배경색과 같은 흰색 border를 줌으로써 스크롤바 오른쪽 여백을 구현
    // 스크롤바의 border-radius까지 figma대로 구현하려면 위처럼 상하좌우 전체에 border를 주고 border-radius를 적용시켜야 함.
  }
  // 스크롤바 위아래 여백
  &::-webkit-scrollbar-button:vertical:start:decrement, // 위 여백
  &::-webkit-scrollbar-button:vertical:end:decrement // 아래 여백
  {
    display: block;
    height: 23px; // 위아래 여백을 28px 주어야 하는데, border-top, border-bottom이 5px 있으므로 23px만
  }
  /* end */

  /* Solve page layout */
  flex: 1;

  * {
    color: #323232;
  }
`;

const ProblemTitle = styled.h1`
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 28px;
`;

const AddTestCaseButton = styled.button`
  float: right;
  margin-top: 16px;
  padding: 8px;
  width: 216px;
  height: 39px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  background-color: #fff;
  border: 2px solid #373737;
  border-radius: 6px;
  cursor: pointer;

  > img {
    width: 24px;
    height: 24px;
  }

  > div {
    font-weight: 500;
  }

  &:hover {
    background-color: #e6e6e6;
  }
`;
