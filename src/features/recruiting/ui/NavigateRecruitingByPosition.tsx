import type { MainTab } from "../model/types";
import { formatPositionByEnglish } from "../lib/formatPositions";
import type { BreifRecruiting } from "../../../shared/api/types/recruiting";
import { useRouteNavigation } from "../../../shared/routes/useRouteNavigation";

export const NavigateRecruitingByPosition = ({
  position,
}: {
  position: MainTab;
}) => {
  const { toRecruitingDetail } = useRouteNavigation();
  // /recruitings/active
  const MOCK_ACTIVE_RECRUITINGS: { items: BreifRecruiting[] } = {
    items: [
      {
        id: 0,
        name: "22.5기 루키 리크루팅",
        generation: "22.5",
        type: "ROOKIE",
        is_active: true,
        from_date: "2025-06-30T06:25:02.346Z",
        to_date: "2025-06-30T06:25:02.346Z",
        applicant_count: 0,
        short_description: "string",
      },
      {
        id: 1,
        name: "22기 프로그래머스 리크루팅",
        generation: "22",
        type: "PROGRAMMER",
        is_active: true,
        from_date: "2025-06-30T06:25:02.346Z",
        to_date: "2025-06-30T06:25:02.346Z",
        applicant_count: 0,
        short_description: "string",
      },
    ],
  };
  const { items: recruitings } = MOCK_ACTIVE_RECRUITINGS;
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
