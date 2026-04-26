import {
  Recruiting,
  RecruitingResult,
  RecruitingSummary,
  BreifRecruiting,
  RecruitingInfoListResponse,
  RecruitingTypeV2,
} from "./recruiting.types";
import { getRequest, postRequest, deleteRequest } from "../utility";

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
export const getRecruitingInfoByType = (type: RecruitingTypeV2) =>
  getRequest<RecruitingInfoListResponse>(
    `/v3/recruitings/info?recruiting_type=${type}`,
  );
