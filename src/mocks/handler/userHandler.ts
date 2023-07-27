import { rest, RestHandler } from "msw";
import { MockProblemResult, MockResumeResult } from "../types/types";
import { getMockUser, setMockUser } from "../db/user";

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
      resume: { submitted: false },
      problems: [
        getRandomProblemResult(1),
        getRandomProblemResult(2),
        getRandomProblemResult(3),
      ],
    };
  return res(ctx.status(200), ctx.delay(), ctx.json(response));
});

const userInfo: RestHandler = rest.get("/users/me", async (req, res, ctx) => {
  const response = getMockUser();
  return res(ctx.status(200), ctx.delay(), ctx.json(response));
});

const submitUserInfo: RestHandler = rest.patch(
  "/users/me",
  async (req, res, ctx) => {
    const data = await req.json();
    setMockUser({ ...getMockUser(), ...data });
    return res(ctx.status(200), ctx.delay(), ctx.json(getMockUser()));
  },
);

export const userHandler = [result, userInfo, submitUserInfo];
