import { Recruiting, RecruitingSummary } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllRecruitings = () =>
  getRequest<{ items: RecruitingSummary[] }>(`/recruitings`, {}, false);

export const getRecruitingById = (id: Recruiting["id"]) =>
  getRequest<Recruiting>(`/recruitings/${id}`);
