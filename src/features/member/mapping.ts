import type { CorePos } from "./constants";
import type { ApiPosition } from "../../apis/member";

export const apiToCore = (p: ApiPosition): CorePos => {
  switch (p) {
    case "FRONTEND":
      return "frontend";
    case "BACKEND":
      return "backend";
    case "ANDROID":
      return "android";
    case "IOS":
      return "ios";
    case "DESIGN":
    case "DESIGNER":
    default:
      return "design";
  }
};

export const coreToApi = (p: CorePos): Exclude<ApiPosition, "DESIGN"> => {
  switch (p) {
    case "frontend":
      return "FRONTEND";
    case "backend":
      return "BACKEND";
    case "android":
      return "ANDROID";
    case "ios":
      return "IOS";
    case "design":
    default:
      return "DESIGNER"; // 서버 스펙 상 DESIGNER 사용
  }
};
