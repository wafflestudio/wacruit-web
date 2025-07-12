import { MainTab } from "../model/types";

export const formatPositionByEnglish = ({
  position,
}: {
  position: MainTab;
}) => {
  if (position === "ROOKIE") {
    return "Rookies";
  }
  if (position === "PROGRAMMER") {
    return "Programmers";
  }
  return "Designers";
};
