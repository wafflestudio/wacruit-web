import styled from "styled-components";

interface Props {
  problemNumber: number;
}

export default function ProblemDescription(props: Props) {
  return <Section>문제 {props.problemNumber}</Section>;
}

const Section = styled.section`
  border: 4px solid #373737;
  border-radius: 5px;

  /* Solve page layout */
  flex: 1;
`;
