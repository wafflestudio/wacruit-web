import styled from "styled-components";

export default function CodeEditor() {
  return (
    <Section>
      <h3>Script</h3>
      <pre>{'main() {\n  puts("Hello, world!");\n}'}</pre>
    </Section>
  );
}

const Section = styled.section`
  border: 4px solid #373737;
  border-bottom-width: 2px;
  border-radius: 5px 5px 0 0;
  flex: 1;
  overflow: auto;
  min-height: 0;
`;
