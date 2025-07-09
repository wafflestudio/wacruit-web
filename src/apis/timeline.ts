import { getRequest } from "./utility";
import type {
  TimelineGroupType,
  TimelineListResponse,
} from "../shared/api/types/timeline";

// V1
export const getTimelines = ({
  queryParams,
}: {
  queryParams: { groupType: TimelineGroupType };
}) =>
  getRequest<TimelineListResponse>(
    `/v3/timelines/?${
      queryParams.groupType !== undefined
        ? `groupType=${queryParams.groupType}`
        : ""
    }`,
  );
