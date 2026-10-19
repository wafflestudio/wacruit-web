import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../routes/constants";
import { useRouteLocation } from "../../routes/useRouteLocation";
import { isRecruitingApplyPath } from "../../routes/recruitingRoute";
import { HEADER_HEIGHT, RECRUITING_TABS_HEIGHT } from "./headerLayout";

export const RecruitingTabs = () => {
  const { path } = useRouteLocation();

  const tabs = [
    {
      label: "모집 안내",
      to: PATH.RECRUITING_INFO,
      selected: path === PATH.RECRUITING_INFO,
    },
    {
      label: "공지사항",
      to: PATH.ANNOUNCEMENT,
      selected: path === PATH.ANNOUNCEMENT,
    },
    {
      label: "지원하기",
      to: PATH.RECRUITING_LIST,
      selected: isRecruitingApplyPath(path),
    },
  ];

  return (
    <TabsContainer aria-label="리크루팅 메뉴">
      <TabList>
        {tabs.map(({ label, to, selected }) => (
          <Tab
            key={to}
            to={to}
            $selected={selected}
            aria-current={selected ? "page" : undefined}
          >
            {label}
          </Tab>
        ))}
      </TabList>
    </TabsContainer>
  );
};

const TabsContainer = styled.nav`
  position: fixed;
  top: ${HEADER_HEIGHT.desktop};
  left: 0;
  z-index: 40;
  width: 100%;
  height: ${RECRUITING_TABS_HEIGHT};
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};

  @media (max-width: 768px) {
    top: ${HEADER_HEIGHT.mobile};
  }
`;

const TabList = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;

  @media (max-width: 768px) {
    gap: 0;
    padding: 0;
  }
`;

const Tab = styled(Link)<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-bottom: 2px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.black[900] : "transparent"};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black[900] : theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ $selected, theme }) =>
    $selected ? theme.fontWeights.bold : theme.fontWeights.semibold};
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;
