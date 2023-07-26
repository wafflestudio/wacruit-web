import { Recruiting, ResumeSubmissionRequest } from "../types/apiTypes";
import { getRequest, postRequest, putRequest } from "./utility";

export const getMyResume = () => getRequest<Recruiting[]>(`/resumes/my`);

export const postResume = (data: ResumeSubmissionRequest) =>
  postRequest(`resumes`, data);

export const putResume = (data: ResumeSubmissionRequest) =>
  putRequest(`resumes`, data);
