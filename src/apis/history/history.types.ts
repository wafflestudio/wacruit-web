export type HistoryItem = {
  id: number;
  history_key: string;
  history_value: string;
  history_unit: string;
};

export type HistoryResponse = HistoryItem[];
