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
    return getRequest<TimelineListResponse>(`/v3/timelines`, {}, false);
  }
  const query = encodeQueryParams({ params: { group: queryParams.groupType } });
  return getRequest<TimelineListResponse>(`/v3/timelines?${query}`, {}, false);
};
