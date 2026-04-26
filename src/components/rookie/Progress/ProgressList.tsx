import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";
import {
  Recruiting,
  RecruitingType,
} from "../../../apis/recruiting/recruiting.types";
/* disable-submission 
import PortfolioCard from "./PortfolioCard";
*/
import { ResumeCard } from "./ResumeCard";
import PortfolioCard from "./PortfolioCard";
// import PortfolioCard from "./PortfolioCard";
import { ProgrammerRecruitInfo } from "../../programmer/ProgrammerRecruitInfo";

type ProgressListProps = {
  recruiting: Recruiting;
  hasResume: boolean;
  type: number;
};

function ResumeInfo({
  recruitingType,
  recruiting,
  hasResume,
}: {
  recruitingType: number;
  recruiting: Recruiting;
  hasResume: boolean;
}) {
  if (recruitingType === RecruitingType.ROOKIE) {
    const problems = recruiting.problem_status;
    return (
      <>
        <ResumeCard submit={hasResume} />
        {problems
          .sort((a, b) => {
            if (a.num > b.num) return 1;
            if (a.num < b.num) return -1;
            return 0;
          })
          .map(({ id, num, status }) => (
            <ProgressCard
              key={id}
              title={`문제 ${num}`}
              statusCode={status}
              to={`./solve/${id}`}
            />
          ))}
      </>
    );
  }
  if (recruitingType === RecruitingType.PROGRAMMER) {
    return <ProgrammerRecruitInfo />;
  }
  return (
    <>
      <ResumeCard submit={hasResume} />
      <PortfolioCard recruiting={recruiting} />
    </>
  );
}

export function ProgressList({
  recruiting,
  hasResume,
  type,
}: ProgressListProps) {
  return (
    <List>
      {/* 루키가 아니면 코딩테스트 대신 포트폴리오 제출 필요 */}
      <ResumeInfo
        recruiting={recruiting}
        recruitingType={type}
        hasResume={hasResume}
      />
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
`;
