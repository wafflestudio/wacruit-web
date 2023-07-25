export type Recruiting = {
  id: number;
  name: string;
  is_active: boolean;
  from_date: string;
  description: string;
  problems: {
    id: number;
    num: number;
    status: "미제출" | "채점중" | "성공" | "실패";
  }[];
};

export type RecruitingSummary = Pick<
  Recruiting,
  "id" | "name" | "is_active" | "from_date"
> & { applicant_count: number };
