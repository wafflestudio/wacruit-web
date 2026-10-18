import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";
import {
  Recruiting,
  RecruitingType,
} from "../../../apis/recruiting/recruiting.types";
import { ResumeCard } from "./ResumeCard";
import PortfolioCard from "./PortfolioCard";
import { ProgrammerRecruitInfo } from "../../programmer/ProgrammerRecruitInfo";

type ProgressListProps = {
  recruiting: Recruiting;
  hasResume: boolean;
  type: number;
};

export function ProgressList({
  recruiting,
  hasResume,
  type,
}: ProgressListProps) {
  if (type === RecruitingType.PROGRAMMER) {
    return <ProgrammerRecruitInfo />;
  }

  if (type === RecruitingType.ROOKIE) {
    const problems = [...recruiting.problem_status].sort(
      (a, b) => a.num - b.num,
    );
    return (
      <List>
        <ResumeCard submit={hasResume} />
        {problems.map(({ id, num, status }) => (
          <ProgressCard
            key={id}
            title={`문제 ${num}`}
            statusCode={status}
            to={`./solve/${id}`}
          />
        ))}
      </List>
    );
  }

  return (
    <List>
      <ResumeCard submit={hasResume} />
      <PortfolioCard recruiting={recruiting} />
    </List>
  );
}

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
`;
