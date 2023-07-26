import { Recruiting, RecruitingSummary } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllRecruitings = () =>
  getRequest<RecruitingSummary[]>(`/recruiting`);

export const getRecruitingById = (id: Recruiting["id"]) =>
  getRequest<Recruiting>(`/recruiting/${id}`);
