import { SeminarListResponse } from "./seminar.types";
import { getRequest } from "../utility";

export const getActiveSeminarList = () =>
  getRequest<SeminarListResponse>(`/v3/seminars/active`);
