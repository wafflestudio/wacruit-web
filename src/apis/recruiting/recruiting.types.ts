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
> & { applicant_count: number; short_description: string };

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
  type: RecruitingTypeV2;
  info_num: number;
  title: string;
  date_info: string;
};

export type RecruitingInfoListResponse = {
  items: RecruitingInfoResponse[];
};

export type RecruitingInfo = {
  id: number;
  type: RecruitingType;
  info_num: number;
  title: string;
  date_info: string;
};
