import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";
import { Recruiting } from "../../../types/apiTypes";
import PortfolioCard from "./PortfolioCard";

type ProgressListProps = {
  problems: Recruiting["problem_status"];
  hasResume: boolean;
  isDesigner: boolean;
};

export function ProgressList({
  problems,
  hasResume,
  isDesigner,
}: ProgressListProps) {
  return (
    <List>
      <ProgressCard
        type="resume"
        title="자기소개서"
        submit={hasResume}
        correct={null}
        to="./resume"
      />
      {isDesigner ? (
        <PortfolioCard submit={false} />
      ) : (
        problems
          .sort((a, b) => {
            if (a.num > b.num) return 1;
            if (a.num < b.num) return -1;
            return 0;
          })
          .map(({ id, num, status }) => (
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
