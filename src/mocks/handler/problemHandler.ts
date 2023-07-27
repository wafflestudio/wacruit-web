import { RestHandler, rest } from "msw";
import { getMockProblem } from "../db/problem";
import { ProblemSubmissionRequest } from "../../types/apiTypes";

const problem: RestHandler = rest.get(
  "/problem/:problem_id",
  (req, res, ctx) => {
    const id = req.params.problem_id;
    const data = getMockProblem(Number(id));
    if (data === undefined) return res(ctx.status(404));
    return res(ctx.status(200), ctx.delay(), ctx.json(data));
  },
);

const submitProblem: RestHandler = rest.post(
  "/problem/:problem_id/submission",
  async (req, res, ctx) => {
    const requestBody = (await req.json()) as ProblemSubmissionRequest;
    const id = req.params.problem_id;
    const problem = getMockProblem(Number(id));
    const extraTestcases = requestBody.extra_testcases;
    if (problem === undefined) return res(ctx.status(404));
    const result = [...problem.testcases, ...extraTestcases].map((testcase) => {
      const correct = Math.random() > 0.5;
      return {
        id,
        status: correct ? 3 : 4,
        stdout: correct ? testcase.expected_output : "잘못된 결과",
        time: Math.random() * 10,
        memory: Math.random() * 1000,
      };
    });
    return res(ctx.status(200), ctx.delay(), ctx.json({ items: result }));
  },
);

export const problemHandler = [problem, submitProblem];
