import { useState } from "react";
import type { TabContent, MainTab, SubTab } from "../model/types";
import { NavigateRecruitingByPosition } from "./NavigateRecruitingByPosition";
import { useSeminarQuery } from "../../../entities/api/useSeminarQuery";
import { PositionTab } from "./PositionTab";

const DEFAULT_TAB_CONTENTS: TabContent[] = [
  {
    id: "ROOKIE",
    information:
      "개발 경험이 많지 않거나 와플스튜디오에서 제공하는 세미나를 통해서 기본부터 다잡고 싶으신 분들",
    subTabs: [
      { id: "SPRING", activityInfo: "TBD", requirementInfo: "TBD" },
      { id: "FAST_API", activityInfo: "TBD", requirementInfo: "TBD" },
      { id: "FRONTEND", activityInfo: "TBD", requirementInfo: "TBD" },
      { id: "ANDROID", activityInfo: "TBD", requirementInfo: "TBD" },
      { id: "IOS", activityInfo: "TBD", requirementInfo: "TBD" },
    ],
  },
  {
    id: "PROGRAMMER",
    information: "실제 프로젝트를 진행해본 경험이 있으신 분들",
    subTabs: [
      {
        id: "PROGRAMMER",
        activityInfo:
          "- 와플스튜디오의 기존 서비스 개발에 참여합니다.\n- 자유롭게 팀을 구성하여 신규 프로젝트를 기획하고 개발합니다.\n- 코루틴 기초와 비동기 I/O를 이해할 수 있습니다.",
        requirementInfo:
          "- Frontend, Backend, Android, iOS 중 하나 이상 분야의 개발 경험이 있는 분\n- (권장) FastAPI, React, Spring boot 중 하나 이상의 Framework 개발 경험이 있으신 분",
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
          "- 와플스튜디오의 기존 서비스의 UI/UX를 개선합니다.\n- 자유롭게 팀을 구성하여 신규 프로젝트를 기획하고 앱 또는 웹의 UI/UX를 디자인합니다.\n- 디자이너들을 대상으로 비정기적 스터디를 진행합니다.",
        requirementInfo:
          "- UI/UX Design에 열정과 관심이 있는 분\n- Figma 등의 툴을 사용해본 경험이 있으신 분\n- (권장) 포토샵, 일러스트레이터 사용 경험이 있으신 분",
      },
    ],
  },
];

export const PositionContents = () => {
  const [selectedMainTabId, setSelectedMainTabId] = useState<MainTab>("ROOKIE");
  const [selectedSubTabId, setSelectedSubTabId] = useState<SubTab | undefined>(
    undefined,
  );
  const { useGetActiveSeminars } = useSeminarQuery();
  const { data, isError } = useGetActiveSeminars();

  if (isError || data === undefined) {
    const defaultCurrentMainContent = DEFAULT_TAB_CONTENTS.find(
      (tab) => tab.id === selectedMainTabId,
    );
    const defaultSelectedSubTabWithInitialValue =
      defaultCurrentMainContent?.subTabs.find((t) => t.id === selectedSubTabId)
        ?.id ?? "SPRING";
    return (
      <>
        <PositionTab
          selectedMainTabId={selectedMainTabId}
          setSelectedMainTabId={setSelectedMainTabId}
          selectedSubTabId={defaultSelectedSubTabWithInitialValue}
          setSelectedSubTabId={setSelectedSubTabId}
          tabContents={DEFAULT_TAB_CONTENTS}
        />
        <NavigateRecruitingByPosition position={selectedMainTabId} />
      </>
    );
  }
  const { items: seminars } = data;

  const tabContents: TabContent[] = DEFAULT_TAB_CONTENTS.map((tab) =>
    tab.id === "ROOKIE"
      ? {
          ...tab,
          subTabs: seminars.map(
            ({ type, curriculum_info, prerequisite_info }) => ({
              id: type,
              activityInfo: curriculum_info,
              requirementInfo: prerequisite_info,
            }),
          ),
        }
      : tab,
  );

  const currentMainContent = tabContents.find(
    (tab) => tab.id === selectedMainTabId,
  );
  const selectedSubTabWithInitialValue =
    currentMainContent?.subTabs.find((t) => t.id === selectedSubTabId)?.id ??
    "SPRING";

  return (
    <>
      <PositionTab
        selectedMainTabId={selectedMainTabId}
        setSelectedMainTabId={setSelectedMainTabId}
        selectedSubTabId={selectedSubTabWithInitialValue}
        setSelectedSubTabId={setSelectedSubTabId}
        tabContents={tabContents}
      />
      <NavigateRecruitingByPosition position={selectedMainTabId} />
    </>
  );
};
