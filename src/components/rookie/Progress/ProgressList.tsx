import styled from "styled-components";
import { ProgressCard } from "./ProgressCard";
import { Recruiting } from "../../../types/apiTypes";
/* disable-submission 
import PortfolioCard from "./PortfolioCard";
*/
import { ResumeCard } from "./ResumeCard";
import PortfolioCard from "./PortfolioCard";
// import PortfolioCard from "./PortfolioCard";

type ProgressListProps = {
  recruiting: Recruiting;
  hasResume: boolean;
};

export function ProgressList({ recruiting, hasResume }: ProgressListProps) {
  const problems = recruiting.problem_status;
  const isDesigner = recruiting.id === 2;
  return (
    <List>
      <ResumeCard submit={hasResume} />
      {isDesigner ? (
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
  gap: 20px;
  list-style: none;
  padding: 0;
`;
