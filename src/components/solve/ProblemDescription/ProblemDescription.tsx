import styled from "styled-components";
import { BoldText, HorizontalLine, TestCase } from "./common";
import MarkdownRenderer from "../../../lib/MarkdownRenderer";
import TestCaseTable from "./TestCaseTable.tsx";

interface ProblemDescriptionProps {
  problemNumber: number;
  problemMarkdown: string;
  defaultTestCases: TestCase[];
}

export default function ProblemDescription({
  problemNumber,
  problemMarkdown,
  defaultTestCases,
}: ProblemDescriptionProps) {
  return (
    <Section>
      <ProblemTitle>문제 {problemNumber}</ProblemTitle>
      <MarkdownRenderer
        markdownString={problemMarkdown}
        StyledWrapper={MarkdownStyledWrapper}
      />
      <HorizontalLine margin="2.5rem 0 1.4rem 0" />
      <BoldText margin="0 0 1.6rem 0">입출력 예시</BoldText>
      <TestCaseTable defaultTestCases={defaultTestCases} />
    </Section>
  );
}

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
