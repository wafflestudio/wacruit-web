import {
  Problem,
  ProblemSubmissionRequest,
  ProblemSubmissionResult,
} from "../types/apiTypes";
import { getRequest, sseRequest } from "./utility";

export const getProblemById = (problem_id: number) =>
  getRequest<Problem>(`/problems/${problem_id}`);

export const postProblemSubmission = (
  problemSubmission: ProblemSubmissionRequest,
) =>
  sseRequest<
    | { type: "skip"; data: { items: [] } }
    | { type: "message"; data: { items: ProblemSubmissionResult[] } }
    | { type: "error"; data: { detail: string } }
  >(
    "/problems/submission",
    problemSubmission,
    {}, // headers
    true, // authorized
  );
