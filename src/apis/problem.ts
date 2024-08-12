import {
  Problem,
  ProblemSubmissionRequest,
  ProblemSubmissionRequestV2,
  ProblemSubmissionResult,
  ProblemSubmissionResultV2,
} from "../types/apiTypes";
import { getRequest, postRequest, sseRequest } from "./utility";

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

export const getProblemByIdV2 = (problem_id: number) =>
  getRequest<Problem>(`/v2/problems/${problem_id}`);

export const postProblemSubmissionV2 = (
  problemSubmission: ProblemSubmissionRequestV2,
) =>
  postRequest<{ message: string }>(
    "/v2/problems/submission",
    problemSubmission,
    {}, // headers
    true, // authorized
  );

export const getProblemSubmissionV2 = (problem_id: number) =>
  sseRequest<
    | { type: "skip"; data: { items: [] } }
    | { type: "message"; data: { items: ProblemSubmissionResultV2[] } }
    | { type: "error"; data: { detail: string } }
    | { type: "unknown"; data: unknown }
  >(
    `/v2/problems/${problem_id}/submission`,
    {}, // body
    {}, // headers
    true, // authorized
    "GET", // method
  );
