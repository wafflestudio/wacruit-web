import styled from "styled-components";
import {
  ProblemSubmissionResult,
  ProblemSubmissionStatusCode,
} from "../../types/apiTypes.ts";
import { LegacyRef } from "react";

type Props = {
  results: ProblemSubmissionResult[];
  error: string[];
  ulRef?: LegacyRef<HTMLUListElement>;
};

export default function TestResultConsole(props: Props) {
  return (
    <Section>
      <SectionTitle>Console</SectionTitle>
      <ul ref={props.ulRef}>
        {props.results.map((result) => (
          <li key={result.num}>
            <h4>{result.num}번 테스트케이스</h4>
            <p>시간: {result.time}초</p>
            <p>메모리: {result.memory}KB</p>
            <Status $code={result.status.id}>
              결과: {result.status.description}
            </Status>
            {result.stdout && (
              <details>
                <summary>출력</summary>
                <pre>{result.stdout}</pre>
              </details>
            )}
          </li>
        ))}
        {props.error.map((err, i) => (
          <li key={i}>
            <h4>에러 {i + 1}</h4>
            <pre>{err}</pre>
          </li>
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

const Status = styled.p<{ $code: number }>`
  color: ${(props) =>
    props.$code === ProblemSubmissionStatusCode.ACCEPTED
      ? "#2fa500"
      : "#ff0000"};
`;
