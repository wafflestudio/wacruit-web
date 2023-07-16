import { rest, RestHandler } from "msw";
import { MockProblemResult, MockResumeResult } from "../types/types";

const getRandomResumeResult = (): MockResumeResult => ({
  submitted: Math.random() > 0.5,
});
const getRandomProblemResult = (index: number): MockProblemResult => {
  const seed = Math.random();
  return {
    index,
    submitted: seed > 0.33,
    correct: seed > 0.66,
  };
};

const result: RestHandler = rest.get("/me/result", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.delay(),
    ctx.json({
      resume: getRandomResumeResult(),
      problems: [
        getRandomProblemResult(1),
        getRandomProblemResult(2),
        getRandomProblemResult(3),
      ],
    }),
  ),
);

export const userHandler = [result];
