import styled from "styled-components";
import useModals from "../../Modal/useModals.tsx";
import Modal from "../../Modal/Modal";
import { BoldText, HorizontalLine, TestCase } from "./common";
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
      {/* <AddTestCaseButton
        onClick={() => {
          modalHandle.openModal();
        }}
      >
        <img src="/icon/AddTestCase.svg" alt="+" />
        <Text as="div">테스트 케이스 추가하기</Text>
      </AddTestCaseButton> */}
    </Section>
  );
}

/* code start: 커스텀 테스트 케이스도 localStorage에 저장하며 사용한다 */

/* end */

const Section = styled.section`
  flex: 1;
  min-height: 0;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;

  * {
    color: ${({ theme }) => theme.colors.black[900]};
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ProblemTitle = styled.h1`
  margin-bottom: 1.6rem;
  font-size: ${({ theme }) => theme.fontSizes[24]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

// const AddTestCaseButton = styled.button`
//   float: right;
//   margin-top: 1.6rem;
//   padding: 0.8rem;
//   width: 21.6rem;
//   height: 3.9rem;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.7rem;

//   background-color: #fff;
//   border: 0.2rem solid #373737;
//   border-radius: 0.6rem;
//   cursor: pointer;

//   > img {
//     width: 2.4rem;
//     height: 2.4rem;
//   }

//   > div {
//     font-weight: 500;
//   }

//   &:hover {
//     background-color: #e6e6e6;
//   }
// `;

const MarkdownStyledWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 1.7;

  table {
    display: block;
    overflow-x: auto;
    max-width: 100%;
    border-collapse: collapse;
    margin: 1.6rem 0;
  }
  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.black[200]};
    padding: 0.6rem 1.2rem;
  }
  th {
    background-color: ${({ theme }) => theme.colors.black[100]};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes[24]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.5;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSizes[20]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.5;
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizes[18]};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.5;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes[16]};
    line-height: 1.7;
  }
  ul,
  ol {
    list-style: disc outside none !important;
    font-size: ${({ theme }) => theme.fontSizes[16]};
    line-height: 1.7;
  }
  code {
    padding: 0.2em 0.4em;
    border-radius: 0.2rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }
  pre {
    padding: 1.2rem 1.6rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
    white-space: pre-wrap !important;
    code {
      background: none;
      padding: 0 !important;
      line-height: 1.8 !important;
    }
  }
`;
