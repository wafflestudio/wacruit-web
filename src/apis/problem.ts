import {
  Problem,
  ProblemSubmissionRequest,
  ProblemSubmissionResult,
} from "../types/apiTypes";
import { getRequest, sseRequest } from "./utility";

export const getProblemById = (problem_id: number) =>
  getRequest<Problem>(`/v1/problems/${problem_id}`);

export const postProblemSubmission = (
  problemSubmission: ProblemSubmissionRequest,
) =>
  sseRequest<
    | { type: "skip"; data: { items: [] } }
    | { type: "message"; data: { items: ProblemSubmissionResult[] } }
    | { type: "error"; data: { detail: string } }
  >(
    "/v1/problems/submission",
    problemSubmission,
    {}, // headers
    true, // authorized
  );
