import { useState } from "react";
import type { SeminarListResponse } from "../../../shared/api/types/seminar";
import type { TabContent, MainTab, SubTab } from "../model/types";
import { PositionTab } from "./PositionTab";

export const Positions = () => {
  // /seminars
  const MOCK_SEMINAR_DATA: SeminarListResponse = {
    items: [
      {
        id: 1,
        type: "SPRING",
        curriculum_info:
          "- Spring boot, kotlin, JPA, MySQL 로 기본적인 API 서버를 만들고 배포할 수 있게 됩니다.\n- 진도에 따라 서버가 빌드되는 과정(gradle), 간단한 컨테이너 기반의 배포(docker, k8s) 등에 대한 설명도 진행할 예정입니다.",
        prerequisite_info:
          "- 기본적인 Java 개발 경험이 있으신 분 (컴프 수강 정도면 충분합니다)\n- git, github 기본적 사용법을 아시는 분\n- (권장) 기본적인 SQL 지식과 Kotlin 문법을 아시는 분",
      },
      {
        id: 2,
        type: "FAST_API",
        curriculum_info:
          "- FastAPI, Pydantic, SQLAlchemy 를 활용한 RESTful API를 구현할 수 있습니다.\n- ASGI 애플리케이션을 배포할 수 있습니다.\n- 코루틴 기초와 비동기 I/O를 이해할 수 있습니다.",
        prerequisite_info:
          "- 백엔드 개발을 해보고 싶은데 파이썬이 가장 익숙하신 분\n- FastAPI를 처음 접하시는 분\n- 풀스택 개발 대신, 백엔드 개발만을 깊게 공부하고 싶으신 분",
      },
    ],
  };
  const { items: seminars } = MOCK_SEMINAR_DATA;

  const tabContents: TabContent[] = [
    {
      id: "ROOKIES",
      information:
        "개발 경험이 많지 않거나 와플스튜디오에서 제공하는 세미나를 통해서 기본부터 다잡고 싶으신 분들",
      subTabs: seminars.map(({ type, curriculum_info, prerequisite_info }) => ({
        id: type,
        activityInfo: curriculum_info,
        requirementInfo: prerequisite_info,
      })),
    },
    {
      id: "PROGRAMMERS",
      information: "실제 프로젝트를 진행해본 경험이 있으신 분들",
      subTabs: [
        {
          id: "PROGRAMMERS",
          activityInfo:
            "- 와플스튜디오의 기존 서비스 개발에 참여합니다.\n- 자유롭게 팀을 구성하여 신규 프로젝트를 기획하고 개발합니다.\n- 코루틴 기초와 비동기 I/O를 이해할 수 있습니다.",
          requirementInfo:
            "- Frontend, Backend, Android, iOS 중 하나 이상 분야의 개발 경험이 있는 분\n- (권장) FastAPI, React, Spring boot 중 하나 이상의 Framework 개발 경험이 있으신 분",
        },
      ],
    },
    {
      id: "DESIGNERS",
      information:
        "와플스튜디오의 프로젝트에서 기획 및 UI/UX 디자인을 중점적으로 진행하고 싶으신 분들",
      subTabs: [
        {
          id: "DESIGNERS",
          activityInfo:
            "- 와플스튜디오의 기존 서비스의 UI/UX를 개선합니다.\n- 자유롭게 팀을 구성하여 신규 프로젝트를 기획하고 앱 또는 웹의 UI/UX를 디자인합니다.\n- 디자이너들을 대상으로 비정기적 스터디를 진행합니다.",
          requirementInfo:
            "- UI/UX Design에 열정과 관심이 있는 분\n- Figma 등의 툴을 사용해본 경험이 있으신 분\n- (권장) 포토샵, 일러스트레이터 사용 경험이 있으신 분",
        },
      ],
    },
  ];

  const [selectedMainTab, setSelectedMainTab] = useState<MainTab>("ROOKIES");

  const currentMainContent = tabContents.find(
    (tab) => tab.id === selectedMainTab,
  );
  const [selectedSubTabId, setSelectedSubTabId] = useState<SubTab>(
    currentMainContent === undefined
      ? "SPRING"
      : currentMainContent.subTabs[0].id,
  );

  return (
    <section>
      <div>
        <h3>모집 파트</h3>
        <p>
          와플스튜디오의 회원은 준회원(Rookies), 정회원(Programmers),
          디자이너(Designers)로 나뉘어 있습니다.
        </p>
      </div>
      <PositionTab
        selectedMainTab={selectedMainTab}
        setSelectedMainTab={setSelectedMainTab}
        selectedSubTabId={selectedSubTabId}
        setSelectedSubTabId={setSelectedSubTabId}
        tabContents={tabContents}
      />
    </section>
  );
};
