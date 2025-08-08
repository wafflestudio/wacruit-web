import { SubTab } from "../model/types";

export const formatSubTabsByEnglish = ({ tab }: { tab: SubTab }) => {
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
