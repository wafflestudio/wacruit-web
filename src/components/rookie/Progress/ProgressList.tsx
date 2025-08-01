import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";
import { Recruiting, RecruitingType } from "../../../types/apiTypes";
/* disable-submission 
import PortfolioCard from "./PortfolioCard";
*/
import { ResumeCard } from "./ResumeCard";
import PortfolioCard from "./PortfolioCard";
// import PortfolioCard from "./PortfolioCard";

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
  const problems = recruiting.problem_status;

  return (
    <List>
      <ResumeCard submit={hasResume} />
      {/* 루키가 아니면 코딩테스트 대신 포트폴리오 제출 필요 */}
      {type !== RecruitingType.ROOKIE ? (
        <PortfolioCard recruiting={recruiting} />
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
              title={`문제 ${num}`}
              statusCode={status}
              to={`./solve/${id}`}
            />
          ))
      )}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
`;
