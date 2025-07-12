import styled from "styled-components";
import type {
  MainTab,
  TabContent,
  SubTab,
  SubTabContent,
} from "../model/types";
import MarkdownRenderer from "../../../lib/MarkdownRenderer";

const TAB_TITLE: { id: MainTab; label: string }[] = [
  {
    id: "ROOKIES",
    label: "준회원(Rookies)",
  },
  {
    id: "PROGRAMMERS",
    label: "정회원(Programmers)",
  },
  {
    id: "DESIGNERS",
    label: "디자이너(Designers)",
  },
];

export const PositionTab = ({
  tabContents,
  selectedMainTab,
  setSelectedMainTab,
  selectedSubTabId,
  setSelectedSubTabId,
}: {
  selectedMainTab: MainTab;
  setSelectedMainTab: (tab: MainTab) => void;
  selectedSubTabId: SubTab;
  setSelectedSubTabId: (subTabId: SubTab) => void;
  tabContents: TabContent[];
}) => {
  // 현재 메인탭 확인 (ID로 불러오기)
  const currentMainContent = tabContents.find(
    (tab) => tab.id === selectedMainTab,
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
    setSelectedMainTab(tab);
    setSelectedSubTabId(newTab.subTabs[0].id);
  };

  // 서브탭 클릭 시 액션
  const handleSubTabChange = (tab: SubTabContent) => {
    setSelectedSubTabId(tab.id);
  };

  return (
    <Section>
      <MainTabGroup>
        {TAB_TITLE.map(({ id, label }) => (
          <TabButton
            key={id}
            onClick={() => handleMainTabChange(id)}
            $selected={id === selectedMainTab}
          >
            {label}
          </TabButton>
        ))}
      </MainTabGroup>

      <Information>
        <p>지원 대상</p>
        <p>{currentMainContent.information}</p>
      </Information>

      {hasMultipleSubTabs && (
        <SubTabGroup>
          {currentMainContent.subTabs.map((sub) => (
            <TabButton
              key={sub.id}
              onClick={() => handleSubTabChange(sub)}
              $selected={sub.id === selectedSubTabId}
            >
              {sub.id}
            </TabButton>
          ))}
        </SubTabGroup>
      )}

      <TabContent>
        <h4>어떤 활동을 하나요?</h4>
        <MarkdownRenderer markdownString={currentSubTab.activityInfo} />

        <h4>어떤 사람이 지원하면 좋을까요?</h4>
        <MarkdownRenderer markdownString={currentSubTab.requirementInfo} />
      </TabContent>
    </Section>
  );
};

const Section = styled.section`
  padding: 2rem;
`;

const MainTabGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SubTabGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const TabButton = styled.button<{ $selected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: ${({ $selected }) => ($selected ? "#333" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
  cursor: pointer;
`;

const Information = styled.p`
  font-size: 1.4rem;
  color: #555;
`;

const TabContent = styled.div`
  margin-top: 1.5rem;
  h4 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  ul {
    margin-bottom: 1rem;
    padding-left: 1.2rem;
    list-style: disc;
    li {
      margin-bottom: 0.4rem;
      font-size: 1.4rem;
      color: #444;
    }
  }
`;
