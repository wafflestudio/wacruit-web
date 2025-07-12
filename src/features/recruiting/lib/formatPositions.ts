import { RecruitingType } from "../../../shared/api/types/recruiting";

export const formatPositionByEnglish = ({
  position,
}: {
  position: RecruitingType;
}) => {
  if (position === "ROOKIE") {
    return "Rookies";
  }
  if (position === "PROGRAMMER") {
    return "Programmers";
  }
  return "Designers";
};
