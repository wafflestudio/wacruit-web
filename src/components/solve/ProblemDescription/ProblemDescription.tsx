import styled from "styled-components";
import useModals from "../../Modal/useModals.tsx";
import Modal from "../../Modal/Modal";
import { BoldText, HorizontalLine, TestCase, Text } from "./common";
import TestCaseModal from "./TestCaseModal";
import { useCallback } from "react";
import MarkdownRenderer from "../../../lib/MarkdownRenderer";
import TestCaseTable from "./TestCaseTable.tsx";

interface ProblemDescriptionProps {
  problemNumber: number;
  problemMarkdown: string;
  defaultTestCases: TestCase[];
  customTestCases: TestCase[];
  setCustomTestCases: (
    param: TestCase[] | ((prev: TestCase[]) => TestCase[]),
  ) => void;
}

export default function ProblemDescription({
  problemNumber,
  problemMarkdown,
  defaultTestCases,
  customTestCases,
  setCustomTestCases,
}: ProblemDescriptionProps) {
  const deleteCustomTestCase = useCallback(
    (deleteIdx: number) =>
      setCustomTestCases((prev) => prev.filter((_, idx) => deleteIdx !== idx)),
    [setCustomTestCases],
  );

  const addNewCustomTestCase = useCallback(
    (newInputs: TestCase[]) => {
      // 모든 테스트케이스 데이터 허용 -- 빈 테케 굳이 거를 필요 없을듯? Hello World가 돌아가게 하고 싶다
      const validData: TestCase[] = newInputs;
      setCustomTestCases((prev: TestCase[]) => [...prev, ...validData]);
    },
    [setCustomTestCases],
  );

  const [modalHandle] = useModals(1);

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
      <MarkdownRenderer
        markdownString={problemMarkdown}
        StyledWrapper={MarkdownStyledWrapper}
      />
      <HorizontalLine margin="2.5rem 0 1.4rem 0" />
      {/**
      // TODO: 문제설명 마크다운에 디자인 추가
      <BoldText>제한사항</BoldText>
      <Text>
        <MarkDownRenderer markdownString={`-100,000 ≤ a, b ≤ 100,000`} />
      </Text>
      <HorizontalLine margin="1.7rem 0 1.4rem 0" />
       */}
      <BoldText margin="0 0 1.6rem 0">입출력 예시</BoldText>
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

/* end */

const Section = styled.section`
  border: 0.4rem solid #373737;
  border-radius: 0.5rem;
  padding: 2.8rem 2.6rem;
  overflow-y: auto;

  /* code start: scrollbar css design */
  &::-webkit-scrollbar {
    width: 1.7rem; // border-left 0.5rem, border-right 5px를 뺀 7px가 보이는 두께
  }
  &::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 1rem;
    border: 0.5rem solid #fff; // 컨텐츠 배경색과 같은 흰색 border를 줌으로써 스크롤바 오른쪽 여백을 구현
    // 스크롤바의 border-radius까지 figma대로 구현하려면 위처럼 상하좌우 전체에 border를 주고 border-radius를 적용시켜야 함.
  }
  // 스크롤바 위아래 여백
  &::-webkit-scrollbar-button:vertical:start:decrement, // 위 여백
  &::-webkit-scrollbar-button:vertical:end:decrement // 아래 여백
  {
    display: block;
    height: 2.3rem; // 위아래 여백을 2.8rem 주어야 하는데, border-top, border-bottom이 0.5rem 있으므로 23px만
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
  font-size: 4rem;
  margin-bottom: 2.8rem;
`;

const AddTestCaseButton = styled.button`
  float: right;
  margin-top: 1.6rem;
  padding: 0.8rem;
  width: 21.6rem;
  height: 3.9rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  background-color: #fff;
  border: 0.2rem solid #373737;
  border-radius: 0.6rem;
  cursor: pointer;

  > img {
    width: 2.4rem;
    height: 2.4rem;
  }

  > div {
    font-weight: 500;
  }

  &:hover {
    background-color: #e6e6e6;
  }
`;

const MarkdownStyledWrapper = styled.div`
  h1 {
    font-size: 4rem;
    line-height: 160%;
  }
  h2 {
    font-weight: 600;
    font-size: 3.2rem;
    line-height: 160%;
  }
  h3 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 160%;
  }
  p {
    font-size: 1.8rem;
    line-height: 160%;
  }
  ul,
  ol {
    list-style: disc outside none !important;
    .li {
    }
  }
  code {
    background: rgba(135, 131, 120, 0.15);
    padding: 0.2em 0.4em;
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    color: #f0745f;
    border-radius: 0.3rem;
  }
  pre {
    background: rgba(135, 131, 120, 0.15);
    white-space: pre-wrap !important;
    padding: 1em 2rem;
    code {
      background: none;
      padding: 0rem !important;
      line-height: 2em !important;
    }
  }
`;
