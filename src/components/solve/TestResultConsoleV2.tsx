import styled from "styled-components";
import { ProblemSubmissionResultV2 } from "../../apis/problem/problem.types";
import { LegacyRef } from "react";

type Props = {
  isSubmitting?: boolean;
  results: ProblemSubmissionResultV2[];
  error: string[];
  ulRef?: LegacyRef<HTMLUListElement>;
};

export default function TestResultConsole(props: Props) {
  return (
    <Section>
      <SectionTitle>Console</SectionTitle>
      <p>테스트 코드가 돌아가는 데에는 1분 가량의 시간이 소요될 수 있습니다.</p>
      {props.isSubmitting && (
        <p>
          채점이 시작되었습니다. 모든 테스트케이스가 채점될 때까지 잠시만
          기다려주세요.
        </p>
      )}
      <ul ref={props.ulRef}>
        {props.results.map((result) => (
          <li key={result.num}>
            <h4>{result.num}번 테스트케이스</h4>
            <p>시간: {result.time}초</p>
            <p>메모리: {result.memory}KB</p>
            <Status $status={result.status}>결과: {result.status}</Status>
            {result.stdout && (
              <details>
                <summary>출력</summary>
                <pre>{result.stdout}</pre>
              </details>
            )}
          </li>
        ))}
        {props.error.map((err, i) => (
          <ErrorItem key={i}>
            <h4>에러 {i + 1}</h4>
            <pre>{err}</pre>
          </ErrorItem>
        ))}
      </ul>
    </Section>
  );
}

const Section = styled.section`
  border: 0.4rem solid #373737;
  border-top-width: 0.2rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  h3 {
    font-weight: bold;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    line-height: 1.2;
    overflow: auto;

    h4 {
      font-weight: bold;
    }
  }

  /* Solve page layout */
  flex: 1;
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
`;

const ErrorItem = styled.li`
  color: #c7382a;

  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const Status = styled.p<{ $status: string }>`
  color: ${(props) => (props.$status === "Accepted" ? "#2fa500" : "#ff0000")};
`;
