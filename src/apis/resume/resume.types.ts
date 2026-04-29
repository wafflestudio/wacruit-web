import type { Recruiting } from "../recruiting/recruiting.types";
import type { User } from "../user/user.types";

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
