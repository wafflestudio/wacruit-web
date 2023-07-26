import styled from "styled-components";
import { EmptyProgressCard, ProgressCard } from "./ProgressCard";
import { Recruiting } from "../../../types/apiTypes";

type ProgressListProps = {
  problems: Recruiting["problems"];
  isLoading: boolean;
};

export function ProgressList({ problems, isLoading }: ProgressListProps) {
  if (isLoading) {
    return (
      <List>
        <EmptyProgressCard />
        <EmptyProgressCard />
        <EmptyProgressCard />
        <EmptyProgressCard />
      </List>
    );
  }

  if (!problems) {
    return <div />;
  }

  return (
    <List>
      <ProgressCard
        type="resume"
        title="자기소개서"
        submit={false}
        correct={null}
        to="./resume"
      />
      {problems.map(({ id, num, status }) => (
        <ProgressCard
          type="problem"
          title={`문제 ${num}`}
          submit={status !== "미제출"}
          correct={status === "성공"}
          to={`./solve/${id}`}
        />
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
`;
