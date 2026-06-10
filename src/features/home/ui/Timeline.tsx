import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTimelines } from "../../../apis/timeline/timeline.api";
import type { TimelineGroupType } from "../../../apis/timeline/timeline.types";

type Tabs = "ROOKIES" | "PROGRAMMERS";

const TAB_CONTENTS: {
  id: Tabs;
  label: string;
  mobileLabel: string;
  groupType: TimelineGroupType;
}[] = [
  {
    id: "ROOKIES",
    label: "준회원 (Rookies)",
    mobileLabel: "준회원",
    groupType: "ROOKIE",
  },
  {
    id: "PROGRAMMERS",
    label: "정회원 (Programmers) 및 디자이너",
    mobileLabel: "정회원 및 디자이너",
    groupType: "PROGRAMMER",
  },
];

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const getColorByTitle = (title: string): string => {
  if (title.includes("자율 프로젝트")) return "#DFFFA3";
  if (title.includes("굽기")) return "#FF2C4C";
  if (title.includes("토이프로젝트")) return "#37007F";
  if (title.includes("세미나")) return "#E69754";
  return "#DFFFA3";
};

const getTextColorByTitle = (title: string): string => {
  if (title.includes("자율 프로젝트")) return "#121212";
  return "#FFFFFF";
};

// 날짜에서 월 추출 (1-12)
const getMonthFromDate = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getMonth() + 1;
};

type TimelineItem = {
  id: number;
  title: string;
  group: string;
  category: {
    id: number;
    title: string;
  };
  start_date: string;
  end_date: string;
};

type TimelineBarData = {
  id: number;
  title: string;
  year: number;
  startMonth: number;
  endMonth: number;
  backgroundColor: string;
  textColor: string;
};

export const TimeLine = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("PROGRAMMERS");

  const currentTab = TAB_CONTENTS.find((tab) => tab.id === selectedTab);

  const { data, isLoading, error } = useQuery({
    queryKey: ["timelines", currentTab?.groupType],
    queryFn: () => {
      if (!currentTab) {
        throw new Error("currentTab is undefined");
      }
      return getTimelines({
        queryParams: { groupType: currentTab.groupType },
      });
    },
    enabled: currentTab != null,
    staleTime: 60_000,
  });

  const handleTabChange = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  if (currentTab == null) {
    return null;
  }

  const timelineBars: TimelineBarData[] =
    data?.items.map((item: TimelineItem) => {
      const startDate = new Date(item.start_date);
      const year = startDate.getFullYear();

      return {
        id: item.id,
        title: item.title,
        year,
        startMonth: getMonthFromDate(item.start_date),
        endMonth: getMonthFromDate(item.end_date),
        backgroundColor: getColorByTitle(item.title),
        textColor: getTextColorByTitle(item.title),
      };
    }) || [];

  const years = [...new Set(timelineBars.map((b) => b.year))].sort((a, b) => a - b);
  const barsByYear = years.map((year) => ({
    year,
    bars: timelineBars.filter((b) => b.year === year),
  }));

  const renderYearTimelineBars = (bars: TimelineBarData[], year: number) => {
    return (
      <TimelineRow key={`desktop-${year}`}>
        {MONTHS.map((_, index) => (
          <WhiteCell key={`white-${year}-${index}`} />
        ))}
        {bars.map((bar) => {
          const span = bar.endMonth - bar.startMonth + 1;
          return (
            <TimelineBar
              key={`desktop-${bar.id}`}
              $backgroundColor={bar.backgroundColor}
              $textColor={bar.textColor}
              $span={span}
              $startMonth={bar.startMonth}
            >
              {bar.title}
            </TimelineBar>
          );
        })}
      </TimelineRow>
    );
  };

  const renderMobileFirstHalf = (bars: TimelineBarData[], year: number) => {
    return (
      <TimelineRow key={`mobile-first-${year}`}>
        {MONTHS.slice(0, 6).map((_, index) => (
          <WhiteCell key={`white-${year}-first-${index}`} />
        ))}
        {bars.map((bar) => {
          if (bar.startMonth > 6) return null;
          const startInRange = Math.max(bar.startMonth, 1);
          const endInRange = Math.min(bar.endMonth, 6);
          const span = endInRange - startInRange + 1;
          if (span <= 0) return null;

          return (
            <TimelineBar
              key={`mobile-first-${bar.id}`}
              $backgroundColor={bar.backgroundColor}
              $textColor={bar.textColor}
              $span={span}
              $startMonth={startInRange}
            >
              {bar.title}
            </TimelineBar>
          );
        })}
      </TimelineRow>
    );
  };

  const renderMobileSecondHalf = (bars: TimelineBarData[], year: number) => {
    return (
      <TimelineRow key={`mobile-second-${year}`}>
        {MONTHS.slice(6, 12).map((_, index) => (
          <WhiteCell key={`white-${year}-second-${index}`} />
        ))}
        {bars.map((bar) => {
          if (bar.endMonth < 7) return null;
          const startInRange = Math.max(bar.startMonth, 7);
          const endInRange = Math.min(bar.endMonth, 12);
          const span = endInRange - startInRange + 1;
          if (span <= 0) return null;

          return (
            <TimelineBar
              key={`mobile-second-${bar.id}`}
              $backgroundColor={bar.backgroundColor}
              $textColor={bar.textColor}
              $span={span}
              $startMonth={startInRange - 6}
            >
              {bar.title}
            </TimelineBar>
          );
        })}
      </TimelineRow>
    );
  };

  return (
    <TimelineContainer>
      <TimelineContent>
        <TimelineHeader>
          <TimelineMainTitle>활동 타임라인</TimelineMainTitle>
          <TimelineSubTitle>
            와플스튜디오의 멤버는 준회원(Rookies), 정회원(Programmers),
            디자이너로 구분됩니다.
            <br />
            <br />
            • 준회원: 한 학기 동안 세미나, 과제, 프로젝트를 진행하며, 모든 과정
            이수 시 정회원으로 승격됩니다.
            <br />
            • 정회원: 자율적으로 팀을 구성하여 서비스 기획 및 개발 활동을
            진행합니다.
            <br />• 디자이너: 팀에 참여하여 서비스 기획 및 디자인을 진행합니다.
          </TimelineSubTitle>
        </TimelineHeader>

        <TabContainer>
          <TabBar>
            {TAB_CONTENTS.map(({ id, label, mobileLabel }) => (
              <TabButton
                key={id}
                onClick={() => {
                  handleTabChange(id);
                }}
                $isActive={selectedTab === id}
              >
                <DesktopLabel>{label}</DesktopLabel>
                <MobileLabel>{mobileLabel}</MobileLabel>
              </TabButton>
            ))}
          </TabBar>

          {isLoading ? (
            <LoadingMessage>타임라인을 불러오는 중...</LoadingMessage>
          ) : error != null ? (
            <ErrorMessage>타임라인을 불러올 수 없습니다</ErrorMessage>
          ) : (
            <TimelineGridWrapper>
              <DesktopTimelineWrapper>
                <MonthHeaderRow>
                  {MONTHS.slice(6, 12).map((month) => (
                    <MonthHeader key={month}>{month}</MonthHeader>
                  ))}
                  {MONTHS.slice(0, 6).map((month) => (
                    <MonthHeader key={month}>{month}</MonthHeader>
                  ))}
                </MonthHeaderRow>
                {barsByYear.map(
                  ({ year, bars }) =>
                    bars.length > 0 && renderYearTimelineBars(bars, year),
                )}
              </DesktopTimelineWrapper>

              <MobileTimelineWrapper>
                <MonthHeaderRow>
                  {MONTHS.slice(6, 12).map((month) => (
                    <MonthHeader key={month}>{month}</MonthHeader>
                  ))}
                </MonthHeaderRow>
                {barsByYear.map(
                  ({ year, bars }) =>
                    bars.length > 0 && renderMobileFirstHalf(bars, year),
                )}

                <MonthHeaderRow>
                  {MONTHS.slice(0, 6).map((month) => (
                    <MonthHeader key={month}>{month}</MonthHeader>
                  ))}
                </MonthHeaderRow>
                {barsByYear.map(
                  ({ year, bars }) =>
                    bars.length > 0 && renderMobileSecondHalf(bars, year),
                )}
              </MobileTimelineWrapper>
            </TimelineGridWrapper>
          )}
        </TabContainer>
      </TimelineContent>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.black[200]};
`;

const TimelineContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: stretch;
  gap: 70px;
`;

const TimelineHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`;

const TimelineMainTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 150%;
  letter-spacing: -0.32px;
  margin: 0;
`;

const TimelineSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 150%;
  letter-spacing: -0.18px;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 80px;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  border-bottom: ${({ $isActive, theme }) =>
    $isActive ? `2px solid ${theme.colors.black[900]}` : "none"};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.fontWeights.bold : theme.fontWeights.medium};
  line-height: 150%;
  letter-spacing: -0.18px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.black[900] : theme.colors.black[500]};
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const DesktopLabel = styled.span`
  @media (max-width: 935px) {
    display: none;
  }
`;

const MobileLabel = styled.span`
  display: none;

  @media (max-width: 935px) {
    display: inline;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[700]};
  padding: 60px 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[700]};
  padding: 60px 20px;
`;

const TimelineGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const DesktopTimelineWrapper = styled.div`
  display: none;
  border-radius: 4px;
  overflow: hidden;

  @media (min-width: 936px) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileTimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;

  @media (min-width: 936px) {
    display: none;
  }
`;

const MonthHeaderRow = styled.div`
  display: flex;
  width: 100%;
  gap: 0;
`;

const MonthHeader = styled.div`
  display: flex;
  width: 78px;
  height: 40px;
  padding: 0 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 150%;
  letter-spacing: -0.16px;
  flex-shrink: 0;

  @media (max-width: 935px) {
    flex: 1;
    width: auto;
    padding: 0 4px;
  }
`;

const TimelineRow = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  position: relative;
`;

const WhiteCell = styled.div`
  width: 78px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;

  @media (max-width: 935px) {
    flex: 1;
    width: auto;
  }
`;

const TimelineBar = styled.div<{
  $backgroundColor: string;
  $textColor: string;
  $span: number;
  $startMonth: number;
}>`
  position: absolute;
  left: ${({ $startMonth }) => ($startMonth - 1) * 78}px;
  width: ${({ $span }) => $span * 78}px;
  height: 40px;
  display: flex;
  padding: 0 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  border-radius: 4px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 150%;
  letter-spacing: -0.14px;
  z-index: 1;

  @media (max-width: 935px) {
    left: calc(${({ $startMonth }) => $startMonth - 1} * 100% / 6);
    width: calc(${({ $span }) => $span} * 100% / 6);
    padding: 0 4px;
  }
`;
