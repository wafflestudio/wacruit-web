import styled from "styled-components";
import { useState } from "react";
// import { useTimelineQuery } from "../../../entities/api/useTimelineQuery";

type Tabs = "ROOKIES" | "PROGRAMMERS";

const TAB_CONTENTS: {
  id: Tabs;
  label: string;
  activityInfo: string;
  passingInfo: string;
}[] = [
  {
    id: "ROOKIES",
    label: "준회원 (Rookies)",
    activityInfo:
      "• 준회원(Rookies)을 대상으로 개발의 기본부터 다질 수 있습니다.\n• 합격시 원하는 세미나를 선택하여 수강할 수 있으며, 반드시 한 개를 수강 완료하셔야 정회원으로 승격될 수 있습니다.\n• 세미나는 하나만 수강 가능하며, 다른 분야의 세미나를 듣고 싶으신 경우 청강을 진행하실 수 있습니다.",
    passingInfo:
      "• 각 세미나에서 제공하는 과제를 마감기한과 스펙에 맞추어 제출해야 합니다.\n• 이후 토이프로젝트를 진행해야 하며, 운영팀에서 참여도와 협업 능력을 확인합니다.",
  },
  {
    id: "PROGRAMMERS",
    label: "정회원 (Programmers) 및 디자이너",
    activityInfo:
      "• 다양한 포지션의 준회원(Rookies)과 디자이너가 모여 간단한 서비스를 개발합니다.\n• 클론코딩 또는 기획 프로젝트를 선택하여 진행할 수 있습니다.",
    passingInfo:
      "• 토이프로젝트의 필수 스펙을 만족해야 하며, 프로젝트 이후 동료 평가를 통해 기여도를 평가합니다.\n• 클론코딩 프로젝트: 기존 서비스(인스타그램, 당근마켓 등)을 클론코딩하며, 기존에 없던 새로운 기능을 하나 이상 추가해야 합니다.\n- 기획 프로젝트: 필수 스펙을 모두 만족하며, 프로토타입 정도의 이상의 완성도를 가진 서비스를 출시합니다.",
  },
];

export const TimeLine = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("PROGRAMMERS");

  const currentTab = TAB_CONTENTS.find((tab) => tab.id === selectedTab);

  const handleTabChange = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  if (currentTab == null) {
    return null;
  }

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
            {TAB_CONTENTS.map(({ id, label }) => (
              <TabButton
                key={id}
                onClick={() => {
                  handleTabChange(id);
                }}
                $isActive={selectedTab === id}
              >
                {label}
              </TabButton>
            ))}
          </TabBar>
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
  background: ${({ theme }) => theme.colors.black[200] || "#E8EBEF"};
`;

const TimelineContent = styled.div`
  display: flex;
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
  max-width: 1000px;
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

// const LoadingMessage = styled.div`
//   text-align: center;
//   font-size: ${({ theme }) => theme.fontSizes[16]};
//   color: ${({ theme }) => theme.colors.black[700]};
//   padding: 60px 20px;
// `;

// const ErrorMessage = styled.div`
//   text-align: center;
//   font-size: ${({ theme }) => theme.fontSizes[16]};
//   color: ${({ theme }) => theme.colors.black[700]};
//   padding: 60px 20px;
// `;
