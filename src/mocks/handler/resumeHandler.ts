import { RestHandler, rest } from "msw";
import { getMyMockResume, setMyMockResume } from "../db/resume";
import { ResumeSubmissionRequest } from "../../types/apiTypes";

const myResume: RestHandler = rest.get("/resumes/my", (req, res, ctx) => {
  const data = getMyMockResume(0);
  return res(ctx.status(200), ctx.delay(), ctx.json(data));
});

const postResume: RestHandler = rest.post("/resumes", async (req, res, ctx) => {
  const requestBody = (await req.json()) as ResumeSubmissionRequest;
  setMyMockResume(0, requestBody);
  return res(ctx.status(200), ctx.delay(), ctx.json(getMyMockResume(0)));
});

const putResume: RestHandler = rest.post("/resumes", async (req, res, ctx) => {
  const requestBody = (await req.json()) as ResumeSubmissionRequest;
  setMyMockResume(0, requestBody);
  return res(ctx.status(200), ctx.delay(), ctx.json(getMyMockResume(0)));
});

export const resumeHandler = [myResume, postResume, putResume];
