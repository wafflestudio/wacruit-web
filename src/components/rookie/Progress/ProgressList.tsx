import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";
import { Recruiting } from "../../../types/apiTypes";

type ProgressListProps = {
  problems: Recruiting["problem_status"];
  isDesigner: boolean;
};

export function ProgressList({ problems, isDesigner }: ProgressListProps) {
  return (
    <List>
      <ProgressCard
        type="resume"
        title="자기소개서"
        submit={false}
        correct={null}
        to="./resume"
      />
      {isDesigner ? (
        <div></div>
      ) : (
        problems.map(({ id, num, status }) => (
          <ProgressCard
            key={id}
            type="problem"
            title={`문제 ${num}`}
            submit={status !== 0}
            correct={status === 3}
            to={`./solve/${id}`}
          />
        ))
      )}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
`;
