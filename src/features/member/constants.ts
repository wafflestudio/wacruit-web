import { theme } from "../../shared/styles/designSystem";

export type CorePos = "android" | "ios" | "frontend" | "backend" | "design";
export type PosFilter = CorePos | "all";
export type SortOrder = "asc" | "desc";

export const POSITION_BUTTONS: { key: PosFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "android", label: "Android" },
  { key: "ios", label: "IOS" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "design", label: "Design" },
];

export const POSITION_LABEL: Record<CorePos, string> = {
  android: "Android",
  ios: "IOS",
  frontend: "Frontend",
  backend: "Backend",
  design: "Design",
};

export const POSITION_COLOR: Record<CorePos, string> = {
  android: theme.colors.brown,
  ios: theme.colors.oak,
  frontend: theme.colors.blue,
  backend: theme.colors.green,
  design: theme.colors.pink,
};

/** 동일 기수 내 정렬 우선순위: and → ios → front → back → design */
export const POSITION_ORDER: Record<CorePos, number> = {
  android: 0,
  ios: 1,
  frontend: 2,
  backend: 3,
  design: 4,
};

export const ACTIVE_TEXT_COLOR: Record<PosFilter, string> = {
  all: theme.colors.black[100],
  android: theme.colors.black[100],
  ios: theme.colors.black[900],
  frontend: theme.colors.black[100],
  backend: theme.colors.black[900],
  design: theme.colors.black[100],
};
