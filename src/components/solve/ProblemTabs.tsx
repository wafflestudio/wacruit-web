import { Link } from "react-router-dom";
import styled from "styled-components";
import asset from "../rookie/Progress/progressCardAsset";
import { ProblemStatusCode } from "../../apis/recruiting/recruiting.types";

type ProblemTab = {
  id: number;
  num: number;
  status: ProblemStatusCode;
};

type ProblemTabsProps = {
  recruitId: number;
  problems: ProblemTab[];
  currentProblemId: number;
  judgingProblemId?: number;
};

const statusAsset = (status: ProblemStatusCode) => {
  switch (status) {
    case ProblemStatusCode.JUDGING:
      return asset.problemJudging;
    case ProblemStatusCode.CORRECT:
      return asset.problemSubmitCorrect;
    case ProblemStatusCode.WRONG:
      return asset.problemSubmitWrong;
    default:
      return asset.problemNotSubmit;
  }
};

const dotColors = {
  green: "#45B61D",
  yellow: "#FFB800",
  red: "#C7382A",
  gray: "#9A9A9A",
} as const;

export default function ProblemTabs({
  recruitId,
  problems,
  currentProblemId,
  judgingProblemId,
}: ProblemTabsProps) {
  return (
    <Nav>
      <BackLink to={`/recruiting/${recruitId}`}>
        <img src="/icon/LeftArrow.svg" alt="" width={31} />
        Back
      </BackLink>
      {problems.length > 0 && (
        <TabList>
          {problems.map(({ id, num, status }) => {
            const { theme, description } = statusAsset(
              id === judgingProblemId ? ProblemStatusCode.JUDGING : status,
            );
            const isCurrent = id === currentProblemId;
            return (
              <li key={id}>
                <Tab
                  to={`/recruiting/${recruitId}/solve/${id}`}
                  $current={isCurrent}
                  aria-current={isCurrent ? "page" : undefined}
                  title={`문제 ${num} · ${description}`}
                >
                  <Dot $color={dotColors[theme]} aria-hidden="true" />
                  문제 {num}
                  <HiddenText>{description}</HiddenText>
                </Tab>
              </li>
            );
          })}
        </TabList>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem 2rem;
  padding: 1.4rem;
  background: #f0745f;
  border-bottom: 0.4rem solid #373737;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: bold;
  font-size: 1.6rem;
  color: #000000;
  text-decoration: none;
  white-space: nowrap;

  &:focus-visible {
    outline: 0.3rem solid #373737;
    outline-offset: 0.3rem;
  }
`;

const TabList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 0;
  padding: 0 0 0 1.2rem;
  list-style: none;
  border-left: 0.2rem solid rgba(55, 55, 55, 0.35);
`;

const Tab = styled(Link)<{ $current: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  border: 0.2rem solid
    ${(props) => (props.$current ? "#373737" : "transparent")};
  border-radius: 0.5rem;
  background: ${(props) =>
    props.$current ? "#fff" : "rgba(255,255,255,0.35)"};
  color: #373737;
  font-size: 1.5rem;
  font-weight: ${(props) => (props.$current ? 700 : 500)};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #fff;
  }

  &:focus-visible {
    outline: 0.3rem solid #373737;
    outline-offset: 0.2rem;
  }
`;

const Dot = styled.span<{ $color: string }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

const HiddenText = styled.span`
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  padding: 0;
  margin: -0.1rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
