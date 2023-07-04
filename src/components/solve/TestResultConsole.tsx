import styled from "styled-components";

export default function TestResultConsole() {
  return (
    <Section>
      <h3>Console</h3>
      <pre>{"Hello, world\nProcess finished with exit code 0"}</pre>
    </Section>
  );
}

const Section = styled.section`
  border: 4px solid #373737;
  border-top-width: 2px;
  border-radius: 0 0 5px 5px;

  /* Solve page layout */
  flex: 1;
  overflow: auto;
`;
