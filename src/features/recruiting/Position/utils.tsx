import type { RecruitingTypeV2 as RecruitingType } from "../../../apis/recruiting/recruiting.types";
import type { SeminarType } from "../../../apis/seminar/seminar.types";
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
    PRODUCT_ENGINEERING: "Product Engineering",
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
  if (tab === "PRODUCT_ENGINEERING") {
    return "Product Engineering";
  }
  return null;
};
