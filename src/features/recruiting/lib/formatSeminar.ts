import type { SeminarType } from "../../../shared/api/types/seminar";

export const formatSeminarByEnglish = ({
  seminar,
}: {
  seminar: SeminarType;
}) => {
  const map: Record<typeof seminar, string> = {
    SPRING: "Server(Spring)",
    FAST_API: "Server(FastAPI)",
    FRONTEND: "Frontend",
    ANDROID: "Android",
    IOS: "iOS",
  };

  return map[seminar];
};
