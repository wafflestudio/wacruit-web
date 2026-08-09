export type SeminarType =
  | "SPRING"
  | "FAST_API"
  | "FRONTEND"
  | "ANDROID"
  | "IOS"
  | "PRODUCT_ENGINEERING";

type SeminarResponse = {
  id: number;
  type: SeminarType;
  curriculum_info: string;
  prerequisite_info: string;
};

export type SeminarListResponse = {
  items: SeminarResponse[];
};
