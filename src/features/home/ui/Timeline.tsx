import { useTimelineQuery } from "../../../entities/api/useTimelineQuery";

export const TimeLine = () => {
  const { useGetTimelines } = useTimelineQuery();
  const { data, isError } = useGetTimelines({});
  if (isError) {
    return <div>에러 발생</div>;
  }
  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  const { items: timeline } = data;
  return (
    <div>
      <h3>활동 타임라인</h3>
      <p>
        <span>
          와플스튜디오의 멤버는 준회원(Rookies), 정회원(Programmers), 디자이너로
          구분됩니다.
        </span>
        <div>
          <span>
            준회원: 한 학기 동안 세미나, 과제, 프로젝트를 진행하며, 모든 과정
            이수 시 정회원으로 승격됩니다.
          </span>
          <span>
            정회원: 자율적으로 팀을 구성하여 서비스 기획 및 개발 활동을
            진행합니다.
          </span>
          <span>
            디자이너: 팀에 참여하여 서비스 기획 및 디자인을 진행합니다.
          </span>
        </div>
      </p>
      <div>
        {timeline.map(
          ({ id, title, group, category, start_date, end_date }) => (
            <div key={`timeline-${id}`}>
              <span>{title}</span>
              <span>{group}</span>
              <span>{category.title}</span>
              <span>{start_date}</span>
              <span>{end_date}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
