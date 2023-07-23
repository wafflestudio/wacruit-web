export type MockResumeResult = {
  submitted: boolean;
};
export type MockProblemResult = {
  index: number;
  submitted: boolean;
  correct: boolean;
};

export type MockResumeQuestionaire = {
  index: number;
  question: string;
  answer: string | null;
};

export type MockApplyNumber = {
  rookie: number;
  designer: number;
};
