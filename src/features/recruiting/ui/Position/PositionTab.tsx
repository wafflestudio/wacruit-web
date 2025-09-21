import styled from "styled-components";
import type {
  MainTab,
  TabContent,
  SubTab,
  SubTabContent,
} from "../../model/types";
import MarkdownRenderer from "../../../../lib/MarkdownRenderer";
import { formatSeminarByEnglish } from "../../lib/formatSeminar";

const TAB_TITLE: { id: MainTab; label: string; width: number }[] = [
  {
    id: "ROOKIE",
    label: "준회원(Rookies)",
    width: 130,
  },
  {
    id: "PROGRAMMER",
    label: "정회원(Programmers)",
    width: 175,
  },
  {
    id: "DESIGNER",
    label: "디자이너",
    width: 62,
  },
];

export const PositionTab = ({
  tabContents,
  selectedMainTabId,
  setSelectedMainTabId,
  selectedSubTabId,
  setSelectedSubTabId,
}: {
  selectedMainTabId: MainTab;
  setSelectedMainTabId: (tab: MainTab) => void;
  selectedSubTabId: SubTab;
  setSelectedSubTabId: (subTabId: SubTab) => void;
  tabContents: TabContent[];
}) => {
  // 현재 메인탭 확인 (ID로 불러오기)
  const currentMainContent = tabContents.find(
    (tab) => tab.id === selectedMainTabId,
  );
  if (currentMainContent === undefined) {
    return null;
  }

  // 현재 서브탭 확인 (ID로 불러오기)
  const currentSubTab = currentMainContent.subTabs.find(
    (sub) => sub.id === selectedSubTabId,
  );
  if (currentSubTab === undefined) {
    return null;
  }

  // 서브탭 바 보이게 할 지 설정 (메뉴가 1개면 바가 보이지 않음.)
  const hasMultipleSubTabs = currentMainContent.subTabs.length > 1;

  // 메인탭 클릭 시 액션
  const handleMainTabChange = (tab: MainTab) => {
    const newTab = tabContents.find((t) => t.id === tab);
    if (newTab === undefined) {
      return;
    }
    setSelectedMainTabId(tab);
    setSelectedSubTabId(newTab.subTabs[0].id);
  };

  // 서브탭 클릭 시 액션
  const handleSubTabChange = (tab: SubTabContent) => {
    setSelectedSubTabId(tab.id);
  };

  return (
    <TabContainer>
      <MainTabBar>
        {TAB_TITLE.map(({ id, label, width }) => (
          <MainTabButton
            key={id}
            onClick={() => {
              handleMainTabChange(id);
            }}
            $isActive={selectedMainTabId === id}
            $width={width}
          >
            {label}
          </MainTabButton>
        ))}
      </MainTabBar>

      <DetailContainer>
        <TabInfo>
          <InfoTitle>지원 대상</InfoTitle>
          <InfoDescription>{currentMainContent.information}</InfoDescription>
        </TabInfo>

        <SeminarDetailContainer>
          <InfoTitle>세미나별 상세 설명</InfoTitle>

          {hasMultipleSubTabs && (
            <SubTabBar>
              {currentMainContent.subTabs.map((sub) => {
                if (sub.id === "DESIGNER" || sub.id === "PROGRAMMER") {
                  return null;
                }
                const formattedSubtab = formatSeminarByEnglish({
                  seminar: sub.id,
                });
                return (
                  <SubTabButton
                    key={sub.id}
                    onClick={() => handleSubTabChange(sub)}
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
              <MarkdownRenderer markdownString={currentSubTab.activityInfo} />
            </DescriptionSection>

            <DescriptionSection>
              <SectionTitle>어떤 사람이 지원하면 좋을까요?</SectionTitle>
              <MarkdownRenderer markdownString={currentSubTab.requirementInfo} />
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
  width:100%;
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
`;

const MainTabButton = styled.button<{ $isActive: boolean; $width: number }>`
  width: ${({ $width }) => $width}px;
  background: transparent;
  border-bottom: ${({ $isActive }) => ($isActive ? '2px solid var(--black-900, #121212)' : 'none')};  
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.fontWeights.bold : theme.fontWeights.semibold};
  line-height: 150%;
  letter-spacing: -0.18px;
  color: ${({ $isActive }) =>
    $isActive ? "var(--black-900, #121212)" : "var(--black-500, #94979E)"};
  line-height: 150%;
  cursor: pointer;
  align-self: stretch;
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
  background: var(--white, #fff);
`;

const TabInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const InfoTitle = styled.h3`
  color: var(--black-900, #121212);
  font-family: "Pretendard Variable";
  font-size: var(--fontsize-18, 18px);
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
`;

const InfoDescription = styled.p`
  color: var(--black-900, #121212);
  font-family: "Pretendard Variable";
  font-size: var(--fontsize-14, 14px);
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
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
`;

const SubTabButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 2px;
  background: ${({ $isActive }) => 
    $isActive 
      ? 'var(--black-900, #121212)' 
      : 'var(--black-100, #F1F2F5)'
  };
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isActive }) => 
      $isActive 
        ? 'var(--black-900, #121212)' 
        : 'var(--black-200, #E8E9EC)'
    };
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
  background: var(--black-100, #F1F2F5);
`;


const SectionTitle = styled.h4`
  color: var(--black-900, #121212);

  /* 16/Bold */
  font-family: "Pretendard Variable";
  font-size: var(--fontsize-16, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
`;
