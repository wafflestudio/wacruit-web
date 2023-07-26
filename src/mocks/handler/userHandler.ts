import { rest, RestHandler } from "msw";
import {
  MockProblemResult,
  MockResumeQuestionaire,
  MockResumeResult,
  UserInfo,
} from "../types/types";
import {
  getMockResume,
  getMockUserInfo,
  hasSubmitMockResume,
  setMockResume,
  setMockUserInfo,
} from "../db/user";

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

const userInfo: RestHandler = rest.get(
  "/api/v1/users/me",
  async (req, res, ctx) => {
    const response: UserInfo = getMockUserInfo();
    return res(ctx.status(200), ctx.delay(), ctx.json(response));
  },
);

const submitUserInfo: RestHandler = rest.put(
  "/api/v1/users/me",
  async (req, res, ctx) => {
    const data = await req.json();
    setMockUserInfo(data);
    return res(ctx.status(200), ctx.delay(), ctx.json({ isSuccess: true }));
  },
);

export const userHandler = [
  result,
  resume,
  submitResume,
  userInfo,
  submitUserInfo,
];
