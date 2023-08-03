import styled from "styled-components";
import { ProblemSubmissionResult } from "../../types/apiTypes.ts";

type Props = {
  results: ProblemSubmissionResult[];
};

export default function TestResultConsole(props: Props) {
  return (
    <Section>
      <h3>Console</h3>
      <ul>
        {props.results.map((result) => (
          <li key={result.num}>
            <div>{result.num}번 테스트케이스</div>
            <div>시간: {result.time}초</div>
            <div>메모리: {result.memory}KB</div>
            <div>결과: {result.status.description}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const Section = styled.section`
  border: 4px solid #373737;
  border-top-width: 2px;
  border-radius: 5px;

  /* Solve page layout */
  flex: 1;
  overflow: auto;
`;
