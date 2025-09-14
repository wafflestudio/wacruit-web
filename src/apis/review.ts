import type { ReviewResponse } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllReviews = () =>
  getRequest<ReviewResponse>(`/v3/reviews`, {}, false);
