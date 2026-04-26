import { getRequest } from "../utility";
import type { HistoryResponse } from "./history.types";

export const getHistories = () => getRequest<HistoryResponse>(`/v3/history`);
