import type { MainTab } from "../model/types";
import { formatPositionByEnglish } from "../lib/formatPositions";
import { useRouteNavigation } from "../../../shared/routes/useRouteNavigation";
import { useRecruitingQuery } from "../../../entities/api/useRecruitingQuery";

export const NavigateRecruitingByPosition = ({
  position,
}: {
  position: MainTab;
}) => {
  const { toRecruitingDetail, toRecruitingList } = useRouteNavigation();
  const { useGetActiveRecruitings } = useRecruitingQuery();
  const { data, isError } = useGetActiveRecruitings();

  if (isError) {
    return (
      <button onClick={toRecruitingList}>
        {formatPositionByEnglish({ position })} 리크루팅
      </button>
    );
  }

  if (data === undefined) {
    return <div>로딩 중...</div>;
  }

  const { items: recruitings } = data;
  const recruitingByPosition = recruitings.find(
    (item) => item.type === position,
  );

  if (recruitingByPosition === undefined) {
    return <div>모집 종료</div>;
  }

  const navigateToRecruiting = () => {
    toRecruitingDetail({ recruitId: recruitingByPosition.id });
  };

  return (
    <button onClick={navigateToRecruiting}>
      {recruitingByPosition.generation}기{" "}
      {formatPositionByEnglish({ position })} 리크루팅
    </button>
  );
};
