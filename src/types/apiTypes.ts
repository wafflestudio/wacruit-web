import { Union } from "./commonTypes";
import { supportedLanguages } from "./constants";

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

export type UserUpdate = Pick<
  User,
  | "department"
  | "college"
  | "university"
  | "github_email"
  | "slack_email"
  | "notion_email"
>;

/**
 * Recruiting
 */

type ProblemStatus = {
  //id: number;
  num: number;
  status: number;
};

export type Recruiting = {
  id: number;
  name: string;
  is_active: boolean;
  from_date: string;
  description: string;
  problem_status: ProblemStatus[];
};

export type RecruitingSummary = Pick<
  Recruiting,
  "id" | "name" | "is_active" | "from_date"
> & { applicant_count: number };

/**
 * Problem
 */

export type TestCase = {
  stdin: string;
  expected_output: string;
};

export type Problem = {
  num: number;
  body: string;
  testcases: TestCase[];
};

export type ProblemSubmissionRequest = {
  problem_id: number;
  language: Union<typeof supportedLanguages>;
  source_code: string;
  is_test: boolean;
  extra_testcases: TestCase[];
};

export type ProblemSubmissionResponse = {
  items: {
    id: number;
    /**
     * Todo: status type 확정되면 constant로 빼기
     */
    status: number;
    stdout: string | null;
    time: number;
    memory: number;
  }[];
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
