type QuestionResponse = {
  id: number;
  question: string;
  answer: string;
};

export type QuestionListResponse = {
  items: QuestionResponse[];
};
