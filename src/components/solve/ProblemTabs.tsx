import { Link } from "react-router-dom";
import styled, { DefaultTheme } from "styled-components";
import asset from "../rookie/Progress/progressCardAsset";
import { ProblemStatusCode } from "../../apis/recruiting/recruiting.types";
import { CREATE_PATH } from "../../shared/routes/constants";

type ProblemTab = {
  id: number;
  num: number;
  status: ProblemStatusCode;
};

type ProblemTabsProps = {
  recruitId: number;
  recruitingName?: string;
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

const dotColor = (
  theme: DefaultTheme,
  status: "red" | "green" | "yellow" | "gray",
) => {
  switch (status) {
    case "green":
      return theme.colors.green;
    case "yellow":
      return theme.colors.oak;
    case "red":
      return theme.colors.pink;
    default:
      return theme.colors.black[700];
  }
};

export default function ProblemTabs({
  recruitId,
  recruitingName,
  problems,
  currentProblemId,
  judgingProblemId,
}: ProblemTabsProps) {
  return (
    <Nav aria-label="문제 목록">
      <BackLink to={CREATE_PATH.RECRUITING_DETAIL({ recruitId })}>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        <span>지원 현황</span>
      </BackLink>
      {problems.length > 0 && (
        <>
          <Separator aria-hidden="true" />
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
                    <Dot $status={theme} aria-hidden="true" />
                    문제 {num}
                    <HiddenText>{description}</HiddenText>
                  </Tab>
                </li>
              );
            })}
          </TabList>
        </>
      )}
      {recruitingName && <RecruitingName>{recruitingName}</RecruitingName>}
    </Nav>
  );
}

const Nav = styled.nav`
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  gap: 2rem;
  height: 5.2rem;
  padding: 0 3.2rem;
  background-color: ${({ theme }) => theme.colors.black[900]};

  @media (max-width: 768px) {
    gap: 1.4rem;
    padding: 0 1.6rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.black[300]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.oak};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const Separator = styled.span`
  width: 1px;
  margin: 1.4rem 0;
  background-color: ${({ theme }) => theme.colors.black[700]};
`;

const TabList = styled.ul`
  display: flex;
  gap: 2.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > li {
    display: flex;
  }
`;

const Tab = styled(Link)<{ $current: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding-top: 0.2rem;
  border-bottom: 2px solid
    ${({ $current, theme }) => ($current ? theme.colors.white : "transparent")};
  color: ${({ $current, theme }) =>
    $current ? theme.colors.white : theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.oak};
    outline-offset: 2px;
  }
`;

const Dot = styled.span<{ $status: "red" | "green" | "yellow" | "gray" }>`
  flex-shrink: 0;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => dotColor(theme, $status)};
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

const RecruitingName = styled.span`
  align-self: center;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;
