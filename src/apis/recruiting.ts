import {
  QuestionResponse,
  Recruiting,
  RecruitingResult,
  RecruitingSummary,
} from "../types/apiTypes";
import type {
  BreifRecruiting,
  RecruitingInfoListResponse,
  RecruitingType,
} from "../shared/api/types/recruiting";
import { getRequest, postRequest, deleteRequest } from "./utility";

// V1
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

// V2
export const getActiveRecruitings = () =>
  getRequest<{ items: BreifRecruiting[] }>(`/v3/recruitings/active`);

export const getRecruitingInfo = () =>
  getRequest<RecruitingInfoListResponse>(`/v3/recruitings/info`);

// V3
export const getAllQuestions = () =>
  getRequest<{ items: QuestionResponse[] }>(`/v3/questions`, {}, false);

export const getRecruitingInfoByType = (type: RecruitingType) =>
  getRequest<RecruitingInfoListResponse>(
    `/v3/recruitings/info?recruiting_type=${type}`,
  );
