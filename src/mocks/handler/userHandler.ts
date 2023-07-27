import { rest, RestHandler } from "msw";
import {
  MockProblemResult,
  MockResumeQuestionaire,
  MockResumeResult,
} from "../types/types";
import { getMockResume, hasSubmitMockResume, setMockResume } from "../db/user";

/**
 * ! Deprecated
 */

const getRandomProblemResult = (index: number): MockProblemResult => {
  const seed = Math.random();
  return {
    index,
    submitted: seed > 0.33,
    correct: seed > 0.66,
  };
};
const result: RestHandler = rest.get("/me/result", (req, res, ctx) => {
  const response: { resume: MockResumeResult; problems: MockProblemResult[] } =
    {
      resume: { submitted: hasSubmitMockResume() },
      problems: [
        getRandomProblemResult(1),
        getRandomProblemResult(2),
        getRandomProblemResult(3),
      ],
    };
  return res(ctx.status(200), ctx.delay(), ctx.json(response));
});

const resume: RestHandler = rest.get("/me/resume", (req, res, ctx) => {
  const response: MockResumeQuestionaire[] = getMockResume();
  return res(ctx.status(200), ctx.delay(), ctx.json(response));
});

const submitResume: RestHandler = rest.post(
  "/me/resume",
  async (req, res, ctx) => {
    const data = await req.json();
    setMockResume(data);
    return res(ctx.status(200), ctx.delay(), ctx.json({ isSuccess: true }));
  },
);

export const userHandler = [result, resume, submitResume];
