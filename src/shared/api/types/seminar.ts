export type SeminarType =
  | "SPRING"
  | "FAST_API"
  | "FRONTEND"
  | "ANDROID"
  | "IOS";

type SeminarResponse = {
  id: number;
  type: SeminarType;
  curriculum_info: string;
  prerequisite_info: string;
};

export type SeminarListResponse = {
  items: SeminarResponse[];
};
