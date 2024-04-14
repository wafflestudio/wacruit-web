import {
  Recruiting,
  RecruitingResult,
  RecruitingSummary,
} from "../types/apiTypes";
import { getRequest, postRequest, deleteRequest } from "./utility";

export const getAllRecruitings = () =>
  getRequest<{ items: RecruitingSummary[] }>(`/v1/recruitings`, {}, false);

export const getRecruitingById = (id: Recruiting["id"]) =>
  getRequest<Recruiting>(`/v1/recruitings/${id}`);

export const getRecruitingResult = (id: Recruiting["id"]) =>
  getRequest<RecruitingResult>(`/v1/recruitings/${id}/result`);

export const applyRecruiting = (id: Recruiting["id"]) =>
  postRequest(`/v1/recruitings/${id}/apply`, {});

export const cancelRecruiting = (id: Recruiting["id"]) =>
  deleteRequest(`/v1/recruitings/${id}/apply`, {});
