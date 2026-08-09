export enum RecruitingType {
  ROOKIE = 1,
  DESIGNER = 2,
  PROGRAMMER = 3,
}

export type RecruitingTypeV2 = "ROOKIE" | "DESIGNER" | "PROGRAMMER";

export enum ProblemStatusCode {
  NOT_SUBMITTED = 0,
  JUDGING = 1,
  CORRECT = 2,
  WRONG = 3,
}

type ProblemStatus = {
  id: number;
  num: number;
  status: ProblemStatusCode;
};

export type Recruiting = {
  id: number;
  name: string;
  type: RecruitingType;
  is_active: boolean;
  applied: boolean;
  from_date?: string;
  to_date?: string;
  description: string;
  problem_status: ProblemStatus[];
};

export type RecruitingSummary = Pick<
  Recruiting,
  "id" | "name" | "type" | "is_active" | "from_date" | "to_date"
> & {
  applicant_count: number;
  short_description: string;
  // 상시 모집 등 기수가 없는 경우 "0.0"으로 내려온다
  generation?: string;
};

export enum RecruitingResultCode {
  IN_PROGRESS = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

export type RecruitingResult = {
  status: RecruitingResultCode;
};

export type BriefRecruiting = {
  id: number;
  name: string;
  generation: string;
  type: RecruitingType;
  is_active: boolean;
  // 상시 모집은 모집 기간이 비어 있다
  from_date: string | null;
  to_date: string | null;
  applicant_count: number;
  short_description: string;
};

type RecruitingInfoResponse = {
  id: number;
  type: RecruitingType;
  info_num: number;
  title: string;
  date_info: string;
};

export type RecruitingInfoListResponse = {
  items: RecruitingInfoResponse[];
};

// 관리자 전용: 특정 리크루팅의 지원자 제출 내역
export type RecruitingSubmission = {
  first_name: string;
  last_name: string;
  university: string | null;
  college: string | null;
  department: string | null;
  phone_number: string;
  github_email: string;
  slack_email: string;
  notion_email: string;
  q1_answer: string | null;
  q2_answer: string | null;
  q3_answer: string | null;
  problem_1_code: string | null;
  problem_2_code: string | null;
  problem_3_code: string | null;
  problem_1_correct: number;
  problem_2_correct: number;
  problem_3_correct: number;
};

export type RecruitingInfo = {
  id: number;
  type: RecruitingType;
  info_num: number;
  title: string;
  date_info: string;
};
