import type {
  MainTab,
  TabContent,
  SubTab,
  SubTabContent,
} from "../model/types";
import MarkdownRenderer from "../../../lib/MarkdownRenderer";
import { formatSeminarByEnglish } from "../lib/formatSeminar";

const TAB_TITLE: { id: MainTab; label: string }[] = [
  {
    id: "ROOKIE",
    label: "준회원(Rookies)",
  },
  {
    id: "PROGRAMMER",
    label: "정회원(Programmers)",
  },
  {
    id: "DESIGNER",
    label: "디자이너(Designers)",
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
    <section>
      <div>
        {TAB_TITLE.map(({ id, label }) => (
          <button key={id} onClick={() => handleMainTabChange(id)}>
            {label}
          </button>
        ))}
      </div>

      <div>
        <p>지원 대상</p>
        <p>{currentMainContent.information}</p>
      </div>

      {hasMultipleSubTabs && (
        <div>
          {currentMainContent.subTabs.map((sub) => {
            if (sub.id === "DESIGNER" || sub.id === "PROGRAMMER") {
              return null;
            }
            const formattedSubtab = formatSeminarByEnglish({
              seminar: sub.id,
            });
            return (
              <button key={sub.id} onClick={() => handleSubTabChange(sub)}>
                {formattedSubtab}
              </button>
            );
          })}
        </div>
      )}

      <div>
        <h4>어떤 활동을 하나요?</h4>
        <MarkdownRenderer markdownString={currentSubTab.activityInfo} />

        <h4>어떤 사람이 지원하면 좋을까요?</h4>
        <MarkdownRenderer markdownString={currentSubTab.requirementInfo} />
      </div>
    </section>
  );
};
