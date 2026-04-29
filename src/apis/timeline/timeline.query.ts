import { useQuery } from "@tanstack/react-query";
import { getTimelines } from "./timeline.api";
import { TimelineGroupType } from "./timeline.types";

export const useTimelineQuery = () => {
  return {
    useGetTimelines: ({
      queryParams,
    }: {
      queryParams?: {
        groupType: TimelineGroupType;
      };
    }) => {
      const { data, isError } = useQuery({
        queryKey: ["timelines"],
        queryFn: () => getTimelines({ queryParams }),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });
      return { data, isError };
    },
  };
};
