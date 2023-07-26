/**
 * Recruiting
 */

import { Union } from "./commonTypes";
import { supportedLanguages } from "./constants";

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
