import { Problem } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getProblemById = (problem_id: number) =>
  getRequest<Problem>(`/problems/${problem_id}`);
