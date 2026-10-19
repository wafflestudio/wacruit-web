import styled from "styled-components";
import { ProblemSubmissionResultV2 } from "../../apis/problem/problem.types";
import { RefObject } from "react";
import { StatusTag } from "../../shared/ui/tag/Tag";

type Props = {
  isSubmitting?: boolean;
  results: ProblemSubmissionResultV2[];
  error: string[];
  ulRef?: RefObject<HTMLUListElement>;
};

export default function TestResultConsole(props: Props) {
  return (
    <Section>
      <Header>
        <SectionTitle>Console</SectionTitle>
        <Hint>
          테스트 코드가 돌아가는 데에는 1분 가량의 시간이 소요될 수 있습니다.
        </Hint>
      </Header>
      <Body>
        {props.isSubmitting && (
          <Message>
            채점이 시작되었습니다. 모든 테스트케이스가 채점될 때까지 잠시만
            기다려주세요.
          </Message>
        )}
        <ResultList ref={props.ulRef}>
          {props.results.map((result) => {
            const isAccepted = result.status === "Accepted";
            return (
              <ResultItem key={result.num}>
                <ResultRow>
                  <ResultName>{result.num}번 테스트케이스</ResultName>
                  <ResultMeta>{result.time}초</ResultMeta>
                  <ResultMeta>{result.memory}KB</ResultMeta>
                  <StatusTag $variant={isAccepted ? "done" : "wrong"}>
                    {isAccepted ? "통과" : result.status}
                  </StatusTag>
                </ResultRow>
                {result.stdout && (
                  <Output>
                    <summary>출력</summary>
                    <pre>{result.stdout}</pre>
                  </Output>
                )}
              </ResultItem>
            );
          })}
          {props.error.map((err, i) => (
            <ErrorItem key={i}>
              <ResultName>에러 {i + 1}</ResultName>
              <pre>{err}</pre>
            </ErrorItem>
          ))}
        </ResultList>
      </Body>
    </Section>
  );
}

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 4.6rem;
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  padding: 0.6rem 1.6rem 1.2rem;
  overflow-y: auto;
`;

const Message = styled.p`
  margin: 0.8rem 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
`;

const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ResultItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[100]};

  &:last-child {
    border-bottom: 0;
  }
`;

const ResultRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) auto;

    > :nth-child(2),
    > :nth-child(3) {
      display: none;
    }
  }
`;

const ResultName = styled.span`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ResultMeta = styled.span`
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-variant-numeric: tabular-nums;
`;

const Output = styled.details`
  margin-top: 0.6rem;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[13]};

  summary {
    cursor: pointer;
  }

  pre {
    margin-top: 0.6rem;
    padding: 1rem 1.2rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const ErrorItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem 0;

  pre {
    padding: 1rem 1.2rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
    color: ${({ theme }) => theme.colors.pink};
    font-size: ${({ theme }) => theme.fontSizes[13]};
    white-space: pre-wrap;
    word-break: break-word;
  }
`;
