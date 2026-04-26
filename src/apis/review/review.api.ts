import type { ReviewResponse } from "./review.types";
import { getRequest } from "../utility";

export const getAllReviews = () =>
  getRequest<ReviewResponse>(`/v3/reviews`, {}, false);
