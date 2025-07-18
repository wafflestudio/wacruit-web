import { RecruitingType } from "../../../shared/api/types/recruiting";

export const formatPositionByEnglish = ({
  position,
}: {
  position: RecruitingType;
}): string => {
  const map: Record<typeof position, string> = {
    ROOKIE: "Rookies",
    PROGRAMMER: "Programmers",
    DESIGNER: "Designers",
  };

  return map[position];
};
