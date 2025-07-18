import { QuestionListResponse } from "../shared/api/types/question";
import { getRequest } from "./utility";

// V2
export const getQuestions = () => {
  getRequest<QuestionListResponse>(`/v3/questions`);
};
