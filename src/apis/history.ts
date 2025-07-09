import { getRequest } from "./utility";
import type { HistoryResponse } from "../shared/api/types/history";

export const getHistories = () => getRequest<HistoryResponse>(`/v3/history`);
