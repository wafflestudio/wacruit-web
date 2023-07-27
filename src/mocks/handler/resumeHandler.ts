import { RestHandler, rest } from "msw";
import {
  getMockQuestions,
  getMyMockResume,
  setMyMockResume,
} from "../db/resume";
import { ResumeSubmissionCreate } from "../../types/apiTypes";

const myResume: RestHandler = rest.get(
  "/recruiting/:recruiting_id/resumes",
  (req, res, ctx) => {
    const { recruiting_id } = req.params;
    const data = getMyMockResume(Number(recruiting_id));
    if (!data) res(ctx.status(404), ctx.delay());
    return res(ctx.status(200), ctx.delay(), ctx.json(data));
  },
);

const postResume: RestHandler = rest.post(
  "/recruiting/:recruiting_id/resumes",
  async (req, res, ctx) => {
    const requestBody = (await req.json()) as ResumeSubmissionCreate[];
    const { recruiting_id } = req.params;
    setMyMockResume(Number(recruiting_id), requestBody);
    const data = getMyMockResume(Number(recruiting_id));
    if (!data) res(ctx.status(404), ctx.delay());
    return res(ctx.status(200), ctx.delay(), ctx.json(data));
  },
);

const putResume: RestHandler = rest.post(
  "/recruiting/:recruiting_id/resumes",
  async (req, res, ctx) => {
    const requestBody = (await req.json()) as ResumeSubmissionCreate[];
    const { recruiting_id } = req.params;
    setMyMockResume(Number(recruiting_id), requestBody);
    const data = getMyMockResume(Number(recruiting_id));
    if (!data) res(ctx.status(404), ctx.delay());
    return res(ctx.status(200), ctx.delay(), ctx.json(data));
  },
);

const getQuestions: RestHandler = rest.get(
  "/recruiting/:recruiting_id/questions",
  (req, res, ctx) => {
    const { recruiting_id } = req.params;
    const data = getMockQuestions(Number(recruiting_id));
    if (!data) res(ctx.status(404), ctx.delay());
    return res(ctx.status(200), ctx.delay(), ctx.json({ items: data }));
  },
);

export const resumeHandler = [myResume, postResume, putResume, getQuestions];
