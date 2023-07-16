import { MockResumeQuestionaire } from "../types/types";

let resume: MockResumeQuestionaire[] = [
  {
    index: 1,
    question: "지원 동기를 500자 이내로 서술해주세요.",
    answer: null,
  },
  {
    index: 2,
    question: "지원 동기를 500자 이내로 서술해주세요.",
    answer: null,
  },
  {
    index: 3,
    question: "지원 동기를 500자 이내로 서술해주세요.",
    answer: null,
  },
];

export const hasSubmitMockResume = () =>
  !(resume.filter(({ answer }) => answer === null).length > 0);
export const getMockResume = () => resume;
export const setMockResume = (data: MockResumeQuestionaire[]) => {
  resume = data;
};
