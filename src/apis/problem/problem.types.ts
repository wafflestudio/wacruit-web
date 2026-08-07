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
  SWIFT = 83,
}

export enum LanguageCodeV2 {
  C = "c",
  CPP = "cpp",
  JAVA = "java",
  JAVASCRIPT = "node",
  PYTHON = "python",
  KOTLIN = "kotlin",
  SWIFT = "swift",
  RUST = "rust",
  GO = "go",
  TYPESCRIPT = "typescript",
}

export type ProblemSubmissionRequest = {
  problem_id: number;
  language: LanguageCode;
  source_code: string;
  is_example?: boolean;
  extra_testcases?: ApiTestCase[];
};

export type ProblemSubmissionRequestV2 = {
  problem_id: number;
  language: LanguageCodeV2;
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

export type ProblemSubmissionResultV2 = {
  num: number;
  status: string;
  stdout: string | null;
  time: number;
  memory: number;
};
