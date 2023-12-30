/**
 * User
 */

export type User = {
  id: number;
  sso_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  department: string;
  college: string;
  university: string;
  github_email: string;
  slack_email: string;
  notion_email: string;
};

export type UserUpdate = Pick<User, "department" | "college" | "university">;

export type UserInvitationEmails = {
  github_email: string;
  slack_email: string;
  notion_email: string;
};
/**
 * Recruiting
 */

export enum ProblemStatusCode {
  NOT_SUBMITTED = 0,
  JUDGING = 1,
  CORRECT = 2,
  WRONG = 3,
}

type ProblemStatus = {
  id: number;
  num: number;
  status: ProblemStatusCode; // 0: 미제출, 1: 채점 중, 2: 정답, 3: 오답
};

export enum RecruitingType {
  ROOKIE = 1,
  DESIGNER = 2,
  PROGRAMMER = 3,
}

export type Recruiting = {
  id: number;
  name: string;
  type: RecruitingType;
  is_active: boolean;
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

/**
 * Problem
 */

export type ApiTestCase = {
  stdin: string;
  expected_output: string;
};

export type Problem = {
  num: number;
  body: string;
  testcases: ApiTestCase[];
};

export enum LanguageCode {
  C = 50,
  CPP = 54,
  JAVA = 62,
  JAVASCRIPT = 93,
  PYTHON = 92,
  KOTLIN = 78,
  SWFIT = 83,
}

export type ProblemSubmissionRequest = {
  problem_id: number;
  language: LanguageCode;
  source_code: string;
  is_example?: boolean;
  extra_testcases?: ApiTestCase[];
};

export enum ProblemSubmissionStatusCode {
  IN_QUEUE = 1,
  PROCESSING = 2,
  ACCEPTED = 3,
  WRONG_ANSWER = 4,
  TIME_LIMIT_EXCEEDED = 5,
  COMPILATION_ERROR = 6,
  RUNTIME_ERROR_SIGSEGV = 7,
  RUNTIME_ERROR_SIGXFSZ = 8,
  RUNTIME_ERROR_SIGFPE = 9,
  RUNTIME_ERROR_SIGABRT = 10,
  RUNTIME_ERROR_NZEC = 11,
  RUNTIME_ERROR_OTHER = 12,
  INTERNAL_ERROR = 13,
  EXEC_FORMAT_ERROR = 14,
}

export type ProblemSubmissionResult = {
  num: number;
  status: {
    id: ProblemSubmissionStatusCode;
    description: string;
  };
  stdout: string | null;
  time: number;
  memory: number;
};

/**
 * Resume
 */

export type Resume = {
  id: number;
  user_id: number;
  recruiting_id: Recruiting["id"];
  question_id: number;
  created_at: string;
  updated_at: string;
  answer: string;
  user: User;
};

export type ResumeSubmissionCreate = {
  question_id: number;
  answer: string;
};

export type ResumeQuestion = {
  recruiting_id: number;
  question_num: number;
  content: string;
  content_limit: number;
  created_at: string;
  updated_at: string;
};

/**
 * Announcement
 */

export type TAnnouncement = {
  id: number;
  title: string;
  content: string;
  created_at: string; //Date로 변환 가능
  updated_at: string; //Date로 변환 가능
};

export type UserRegisterRequest = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
};

export type PortfolioFile = {
  portfolio_name: string;
};
export type PortfolioLink = {
  id: number;
  url: string;
};
