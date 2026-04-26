import { QuestionListResponse } from "./question.types";
import { getRequest } from "../utility";

export const getRecruitingQuestions = () =>
  getRequest<QuestionListResponse>(`/v3/questions`);
