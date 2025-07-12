import { RecruitingInfoListResponse } from "../../../shared/api/types/recruiting";
import { RecruitingType } from "../../../shared/api/types/recruiting";
import { formatPositionByEnglish } from "../lib/formatPositions";

export const RecruitTimeline = () => {
  // /recruitings/info/?recruiting_type
  const MOCK_RECRUITING_TIMELINE: RecruitingInfoListResponse = {
    items: [
      {
        id: 0,
        type: "ROOKIE",
        info_num: 2,
        title: "서류 결과 발표",
        date_info: "25.08.18",
      },
      {
        id: 1,
        type: "ROOKIE",
        info_num: 1,
        title: "셔류 제출 마감",
        date_info: "25.08.13",
      },
      {
        id: 2,
        type: "ROOKIE",
        info_num: 3,
        title: "ot/세미나 시작",
        date_info: "25.08.20",
      },
      {
        id: 3,
        type: "PROGRAMMER",
        info_num: 1,
        title: "서류 접수 마감일",
        date_info: "상시",
      },
      {
        id: 4,
        type: "ROOKIE",
        info_num: 4,
        title: "토이프로젝트 시작",
        date_info: "25.12.22",
      },
      {
        id: 5,
        type: "DESIGNER",
        info_num: 1,
        title: "서류 접수 마감일",
        date_info: "상시",
      },
    ],
  };

  const { items: recruitingTimelines } = MOCK_RECRUITING_TIMELINE;

  const orderedTypes: RecruitingType[] = ["ROOKIE", "PROGRAMMER", "DESIGNER"];

  const sortedTimeline = [...recruitingTimelines].sort((a, b) => {
    const typeCompare =
      orderedTypes.indexOf(a.type) - orderedTypes.indexOf(b.type);
    if (typeCompare !== 0) return typeCompare;
    return a.info_num - b.info_num;
  });

  return (
    <div>
      <h3>모집 일정</h3>
      {orderedTypes.map((type) => (
        <div key={type}>
          <h4>{formatPositionByEnglish({ position: type })}</h4>
          <div>
            {sortedTimeline
              .filter((item) => item.type === type)
              .map((item) => (
                <div key={item.id}>
                  <p>{item.title}</p>
                  <p>{item.date_info}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
