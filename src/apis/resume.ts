import {
  ResumeQuestion,
  Resume,
  ResumeSubmissionCreate,
} from "../types/apiTypes";
import { deleteRequest, getRequest, postRequest, putRequest } from "./utility";

export const getMyResumes = (recruiting_id: number) =>
  getRequest<{ items: Resume[] }>(`/v1/recruitings/${recruiting_id}/resumes`);

export const postResume = (
  recruiting_id: number,
  data: ResumeSubmissionCreate[],
) => postRequest(`/v1/recruitings/${recruiting_id}/resumes`, data);

export const putResume = (
  recruiting_id: number,
  data: ResumeSubmissionCreate[],
) => putRequest(`/v1/recruitings/${recruiting_id}/resumes`, data);

export const getQuestions = (recruiting_id: number) =>
  getRequest<{ items: ResumeQuestion[] }>(
    `/v1/recruitings/${recruiting_id}/questions`,
  );

export const deleteResume = (recruiting_id: number) =>
  deleteRequest(`/v1/recruitings/${recruiting_id}/resumes`, {});
