import { SeminarListResponse } from "../shared/api/types/seminar";
import { getRequest } from "./utility";

// V2
export const getSeminarList = () => {
  getRequest<SeminarListResponse>(`/v3/seminars`);
};
