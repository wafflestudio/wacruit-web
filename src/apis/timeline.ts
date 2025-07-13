import { getRequest } from "./utility";
import type {
  TimelineGroupType,
  TimelineListResponse,
} from "../shared/api/types/timeline";
import { encodeQueryParams } from "./utility";

export const getTimelines = ({
  queryParams,
}: {
  queryParams?: { groupType: TimelineGroupType };
}) => {
  if (queryParams === undefined) {
    return getRequest<TimelineListResponse>(`/v3/timelines`);
  }
  const query = encodeQueryParams({ params: queryParams });
  return getRequest<TimelineListResponse>(`/v3/timelines/?${query}`);
};
