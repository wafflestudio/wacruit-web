import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";

export function ProgressList() {
  return (
    <List>
      <ProgressCard
        type="resume"
        title="자기소개서"
        submit={false}
        correct={null}
        to="./resume"
      />
      <ProgressCard
        type="problem"
        title="문제 1"
        submit={true}
        correct={true}
        to="../solve/1"
      />
      <ProgressCard
        type="problem"
        title="문제 2"
        submit={true}
        correct={false}
        to="../solve/2"
      />
      <ProgressCard
        type="problem"
        title="문제 3"
        submit={false}
        correct={false}
        to="../solve/3"
      />
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
`;
