import type { RecruitingType } from "../../../shared/api/types/recruiting";
import type { SeminarType } from "../../../shared/api/types/seminar";
import type { SubTab } from "./types";

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

export const formatSeminarByEnglish = ({
  seminar,
}: {
  seminar: SeminarType;
}): string => {
  const map: Record<typeof seminar, string> = {
    SPRING: "Server(Spring)",
    FAST_API: "Server(FastAPI)",
    FRONTEND: "Frontend",
    ANDROID: "Android",
    IOS: "iOS",
  };

  return map[seminar];
};

export const formatSubTabsByEnglish = ({
  tab,
}: {
  tab: SubTab;
}): string | null => {
  if (tab === "SPRING") {
    return "Server(Spring)";
  }
  if (tab === "FAST_API") {
    return "Server(FastAPI)";
  }
  if (tab === "FRONTEND") {
    return "Frontend";
  }
  if (tab === "ANDROID") {
    return "Android";
  }
  if (tab === "IOS") {
    return "iOS";
  }
  return null;
};
