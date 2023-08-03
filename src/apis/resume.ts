import {
  ResumeQuestion,
  Resume,
  ResumeSubmissionCreate,
} from "../types/apiTypes";
import { getRequest, postRequest, putRequest } from "./utility";

export const getMyResumes = (recruiting_id: number) =>
  getRequest<{ items: Resume[] }>(`/recruitings/${recruiting_id}/resumes`);

export const postResume = (
  recruiting_id: number,
  data: ResumeSubmissionCreate[],
) => postRequest(`/recruitings/${recruiting_id}/resumes`, data);

export const putResume = (
  recruiting_id: number,
  data: ResumeSubmissionCreate[],
) => putRequest(`/recruitings/${recruiting_id}/resumes`, data);

export const getQuestions = (recruiting_id: number) =>
  getRequest<{ items: ResumeQuestion[] }>(
    `/recruitings/${recruiting_id}/questions`,
  );
