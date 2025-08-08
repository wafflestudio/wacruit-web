import { RecruitingType } from "../../../shared/api/types/recruiting";
import { formatPositionByEnglish } from "../lib/formatPositions";
import { useRecruitingQuery } from "../../../entities/api/useRecruitingQuery";

export const RecruitTimeline = () => {
  const { useGetRecruitingTimelineInfo } = useRecruitingQuery();
  const { data, isError } = useGetRecruitingTimelineInfo();
  if (isError) {
    return <div>에러 발생</div>;
  }
  if (data === undefined) {
    return <div>로딩중..</div>;
  }
  const { items: recruitingTimelines } = data;

  const orderedTypes: RecruitingType[] = ["ROOKIE", "PROGRAMMER", "DESIGNER"];

  const sortedTimeline = [...recruitingTimelines].sort((a, b) => {
    const typeCompare =
      orderedTypes.indexOf(a.type) - orderedTypes.indexOf(b.type);
    if (typeCompare !== 0) {
      return typeCompare;
    }
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
