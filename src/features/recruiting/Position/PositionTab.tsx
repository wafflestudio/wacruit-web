import { useState } from "react";
import styled from "styled-components";
import type { MainTab, SubTab, TabContent } from "./types";
import { formatSeminarByEnglish } from "./utils";
import { SeminarType } from "../../../shared/api/types/seminar";

const DEFAULT_TAB_CONTENTS: TabContent[] = [
  {
    id: "ROOKIE",
    information:
      "개발 경험이 많지 않거나 와플스튜디오에서 제공하는 세미나를 통해서 기본부터 다잡고 싶으신 분들",
    subTabs: [
      {
        id: "SPRING",
        activityInfo:
          "• Spring boot, kotlin, JPA, MySQL 등 기본적인 API 서버를 만들고 배포할 수 있게 됩니다.\n• 진도에 따라 서버가 빌드되는 과정(gradle), 간단한 컨테이너 기반의 배포 (docker, k8s) 등에 대한 상황도 진행할 예정입니다.",
        requirementInfo:
          "• 기본적인 Java 개발 경험이 있으신 분 (람다 수준 정도로 충분합니다)\n• git, github 기본적 사용법을 아시는 분\n• (권장) 기본적인 SQL 지식과 Kotlin 문법을 아시는 분",
      },
      {
        id: "FAST_API",
        activityInfo:
          "• FastAPI, Pydantic, SQLAlchemy 를 활용한 RESTful API를 구현할 수 있습니다.\n• ASGI 애플리케이션을 배포할 수 있습니다.\n• 코루틴 기초와 비동기 I/O를 이해할 수 있습니다.",
        requirementInfo:
          "• 백엔드 개발을 해보고 싶은데 파이썬이 가장 익숙하신 분 \n• FastAPI를 처음 접하시는 분\n• 풀스택 개발 대신, 백엔드 개발만을 깊게 공부하고 싶으신 분",
      },
      {
        id: "FRONTEND",
        activityInfo:
          "• 와플스튜디오에서 좋은 프론트엔드 개발자로 활동할 수 있는 실력과 마인드셋을 쌓는 것을 목표로 합니다.\n• 기본적인 웹 어플리케이션을 제작하고 배포하는 법을 공부합니다.\n• React 와 TypeScript 사용법을 익힙니다.",
        requirementInfo:
          "• 웹에서 돌아가는 어플리케이션을 개발하고 싶으신 분\n• 자바스크립의 생태계의 높은 생산성을 토대로 좋은 개발 경험을 체험하고 싶으신 분",
      },
      {
        id: "ANDROID",
        activityInfo:
          "• 다양한 UI들을 디자인 요구사항에 맞게 구현하고 사용자와 상호작용하도록 하는 방법을 배웁니다.\n• 서버와의 네트워크 통신을 구현하고, 데이터를 동적으로 UI에 반영하는 방법을 배웁니다.\n• 안드로이드 앱 아키텍처의 주요 설계 원칙을 이해하고, 이를 활용하여 좋은 코드를 짜고 잘 만든 안드로이드 앱을 만듭니다.",
        requirementInfo:
          "• Kotlin 언어를 간단하게 경험해보신 분\n• (권장) 안드로이드 기기를 가지고 계신 분",
      },
      {
        id: "IOS",
        activityInfo:
          "• iOS 앱 개발을 위한 기본적인 내용을 공부합니다.\n• 백엔드 개발자, 디자이너와의 원활한 협업을 위한 네트워크 통신 및 UI 구현 방법을 배웁니다.\n• Swift 기반의 iOS 앱 개발을 익힙니다.",
        requirementInfo:
          "• Swift의 기본 문법을 간단하게 확인하신 분\n• 맥북 / 아이맥 등 macOS가 설치된 기기를 한 개 이상 소지하신 분",
      },
    ],
  },
  {
    id: "PROGRAMMER",
    information: "실제 프로젝트를 진행해본 경험이 있으신 분들",
    subTabs: [
      {
        id: "PROGRAMMER",
        activityInfo:
          "• 와플스튜디오의 기존 서비스 개발에 참여합니다.\n• 자유롭게 팀을 구성하여 신규 프로젝트를 기획하고 개발합니다.\n• 코루틴 기초와 비동기 I/O를 이해할 수 있습니다.",
        requirementInfo:
          "• Frontend, Backend, Android, iOS 중 하나 이상 분야의 개발 경험이 있는 분\n• (권장) FastAPI, React, Spring boot 중 하나 이상의 Framework 개발 경험이 있으신 분",
      },
    ],
  },
  {
    id: "DESIGNER",
    information:
      "와플스튜디오의 프로젝트에서 기획 및 UI/UX 디자인을 중점적으로 진행하고 싶으신 분들",
    subTabs: [
      {
        id: "DESIGNER",
        activityInfo:
          "• 와플스튜디오의 기존 서비스의 UI/UX를 개선합니다.\n• 자유롭게 팀을 구성하여 신규 프로젝트를 기획하고 앱 또는 웹의 UI/UX를 디자인합니다.\n• 디자이너들을 대상으로 비정기적 스터디를 진행합니다.",
        requirementInfo:
          "• UI/UX Design에 열정과 관심이 있는 분\n• Figma 등의 툴을 사용해본 경험이 있으신 분\n• (권장) 포토샵, 일러스트레이터 사용 경험이 있으신 분",
      },
    ],
  },
];

const TAB_TITLE: { id: MainTab; label: string; mobileLabel?: string }[] = [
  {
    id: "ROOKIE",
    label: "준회원(Rookies)",
    mobileLabel: "준회원",
  },
  {
    id: "PROGRAMMER",
    label: "정회원(Programmers)",
    mobileLabel: "정회원",
  },
  {
    id: "DESIGNER",
    label: "디자이너",
  },
];

export const PositionTab = () => {
  const [selectedMainTabId, setSelectedMainTabId] = useState<MainTab>("ROOKIE");
  const [selectedSubTabId, setSelectedSubTabId] = useState<SubTab>("SPRING");

  const currentMainContent = DEFAULT_TAB_CONTENTS.find(
    (tab) => tab.id === selectedMainTabId,
  );

  const currentSubTab = currentMainContent?.subTabs.find(
    (sub) => sub.id === selectedSubTabId,
  );

  const hasMultipleSubTabs = (currentMainContent?.subTabs.length ?? 0) > 1;

  const handleMainTabChange = (tab: MainTab) => {
    const newTab = DEFAULT_TAB_CONTENTS.find((t) => t.id === tab);
    if (newTab == null) {
      return;
    }
    setSelectedMainTabId(tab);
    setSelectedSubTabId(newTab.subTabs[0].id);
  };

  const handleSubTabChange = (tabId: SubTab) => {
    setSelectedSubTabId(tabId);
  };

  return (
    <TabContainer>
      <MainTabBar>
        {TAB_TITLE.map(({ id, label, mobileLabel }) => (
          <MainTabButton
            key={id}
            onClick={() => {
              handleMainTabChange(id);
            }}
            $isActive={selectedMainTabId === id}
          >
            <span className="desktop-label">{label}</span>
            <span className="mobile-label">{mobileLabel || label}</span>
          </MainTabButton>
        ))}
      </MainTabBar>

      <DetailContainer>
        <TabInfo>
          <InfoTitle>지원 대상</InfoTitle>
          <InfoDescription>{currentMainContent?.information}</InfoDescription>
        </TabInfo>

        <SeminarDetailContainer>
          <InfoTitle>세미나별 상세 설명</InfoTitle>

          {hasMultipleSubTabs && (
            <SubTabBar>
              {currentMainContent?.subTabs.map((sub) => {
                if (sub.id === "DESIGNER" || sub.id === "PROGRAMMER") {
                  return null;
                }
                const formattedSubtab = formatSeminarByEnglish({
                  seminar: sub.id as SeminarType,
                });
                return (
                  <SubTabButton
                    key={sub.id}
                    onClick={() => {
                      handleSubTabChange(sub.id);
                    }}
                    $isActive={selectedSubTabId === sub.id}
                  >
                    {formattedSubtab}
                  </SubTabButton>
                );
              })}
            </SubTabBar>
          )}

          <TabContent>
            <DescriptionSection>
              <SectionTitle>어떤 활동을 하나요?</SectionTitle>
              <SectionContent>{currentSubTab?.activityInfo}</SectionContent>
            </DescriptionSection>

            <DescriptionSection>
              <SectionTitle>어떤 사람이 지원하면 좋을까요?</SectionTitle>
              <SectionContent>{currentSubTab?.requirementInfo}</SectionContent>
            </DescriptionSection>
          </TabContent>
        </SeminarDetailContainer>
      </DetailContainer>
    </TabContainer>
  );
};

const TabContainer = styled.section`
  display: flex;
  max-width: 1000px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const MainTabBar = styled.div`
  display: flex;
  height: 34px;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;

  @media (max-width: 480px) {
    gap: 40px;
  }
`;

const MainTabButton = styled.button<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  border-bottom: ${({ $isActive, theme }) =>
    $isActive ? `2px solid ${theme.colors.black[900]}` : "none"};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.fontWeights.bold : theme.fontWeights.semibold};
  line-height: 150%;
  letter-spacing: -0.18px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.black[900] : theme.colors.black[500]};
  cursor: pointer;
  align-self: stretch;

  .mobile-label {
    display: none;
  }

  .desktop-label {
    display: inline;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }

  @media (max-width: 768px) {
    letter-spacing: -0.16px;

    .desktop-label {
      display: none;
    }

    .mobile-label {
      display: inline;
    }
  }
`;

const DetailContainer = styled.div`
  display: flex;
  padding: 34px 42px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  align-self: stretch;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white || "#fff"};

  @media (max-width: 768px) {
    padding: 20px 24px;
  }
`;

const TabInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 150%;
  letter-spacing: -0.18px;
  margin: 0;

  @media (max-width: 768px) {
    letter-spacing: -0.16px;
  }
`;

const InfoDescription = styled.p`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 150%;
  letter-spacing: -0.14px;
  margin: 0;
`;

const SeminarDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-self: stretch;
`;

const SubTabBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: 18px;
  gap: 0;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const SubTabButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 2px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.black[900] : theme.colors.black[100]};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white || "#fff" : theme.colors.black[700]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.black[900] : theme.colors.black[200]};
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const DescriptionSection = styled.div`
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.black[100]};
`;

const SectionTitle = styled.h4`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 150%;
  letter-spacing: -0.16px;
  margin: 0;
`;

const SectionContent = styled.div`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 150%;
  letter-spacing: -0.14px;
  white-space: pre-wrap;
`;
