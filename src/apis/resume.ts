import {
  ResumeQuestion,
  Resume,
  ResumeSubmissionCreate,
} from "../types/apiTypes";
import { getRequest, postRequest, putRequest } from "./utility";

export const getMyResumes = (recruiting_id: number) =>
  getRequest<{ items: Resume[] }>(`/recruiting/${recruiting_id}/resumes`);

export const postResume = (
  recruiting_id: number,
  data: ResumeSubmissionCreate[],
) => postRequest(`/recruiting/${recruiting_id}/resumes`, data);

export const putResume = (
  recruiting_id: number,
  data: ResumeSubmissionCreate[],
) => putRequest(`/recruiting/${recruiting_id}/resumes`, data);

export const getQuestions = (recruiting_id: number) =>
  getRequest<{ items: ResumeQuestion[] }>(
    `/recruiting/${recruiting_id}/questions`,
  );
