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
      <ResumeCard submit={hasResume} />
      {isDesigner ? (
        <PortfolioCard />
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
