import { useState } from "react";
import MarkdownRenderer from "../../../lib/MarkdownRenderer";

type Tabs = "SEMINAR" | "TOY_PROJECT";
const TAB_CONTENTS: {
  id: Tabs;
  label: string;
  activityInfo: string;
  passingInfo: string;
}[] = [
  {
    id: "SEMINAR",
    label: "세미나",
    activityInfo:
      "- 준회원(Rookies)를 대상으로 개발의 기본부터 다질 수 있습니다.\n- 합격시 원하는 세미나를 선택하여 수강할 수 있으며, <u>**반드시 한 개를 수강 완료**</u>하셔야 정회원으로 승격될 수 있습니다.\n- 세미나는 하나만 수강 가능하며, 다른 분야의 세미나를 듣고 싶으신 경우 청강을 진행하실 수 있습니다.",
    passingInfo:
      "- 각 세미나에서 제공하는 <u>**과제**</u>를 마감기한과 스펙에 맞추어 제출해야 합니다.\n- 이후 <u>**토이프로젝트**</u>를 진행해야 하며, 운영팀에서 참여도와 협업 능력을 확인합니다.",
  },
  {
    id: "TOY_PROJECT",
    label: "토이 프로젝트",
    activityInfo:
      "- 다양한 포지션의 준회원(Rookies)과 디자이너가 모여 간단한 서비스를 개발합니다.\n- <u>**클론코딩 또는 기획 프로젝트**</u>를 선택하여 진행할 수 있습니다.",
    passingInfo:
      "- 토이프로젝트의 <u>**필수 스펙**</u>을 만족해야 하며, 프로젝트 이후 <u>**동료 평가**</u>를 통해 기여도를 평가합니다.\n- 클론코딩 프로젝트: 기존 서비스(인스타그램, 당근마켓 등)을 클론코딩하며, 기존에 없던 새로운 기능을 하나 이상 추가해야 합니다.\n- 기획 프로젝트: 필수 스펙을 모두 만족하며, 프로토타입 정도의 이상의 완성도를 가진 서비스를 출시합니다. ",
  },
];

export const RookieInfo = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("SEMINAR");
  const currentTab = TAB_CONTENTS.find((tab) => tab.id === selectedTab);
  const onClickTab = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  if (currentTab === undefined) {
    return null;
  }

  return (
    <div>
      <div>
        <h3>세미나 및 토이프로젝트</h3>
        <div>
          <span>
            개발을 처음 접하는 준회원들을 교육하기 위해 학기중에 세미나,
            방학중에 토이프로젝트를 진행합니다.
          </span>
          <span>
            Spring, FastAPI, React, Android, iOS, 총 5가지 분야의 개발 세미나를
            통해 개발의 첫 걸음을 뗄 수 있도록 지원합니다.
          </span>
        </div>
      </div>
      <div>
        <div>
          {TAB_CONTENTS.map(({ id, label }) => (
            <button
              key={`rookie-info-${id}`}
              onClick={() => {
                onClickTab(id);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          <div>
            <p>어떤 활동을 하나요?</p>
            <MarkdownRenderer markdownString={currentTab.activityInfo} />
          </div>
          <div>
            <p>통과 기준이 어떻게 되나요?</p>
            <MarkdownRenderer markdownString={currentTab.passingInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
