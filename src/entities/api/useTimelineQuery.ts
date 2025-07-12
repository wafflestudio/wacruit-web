import { useQuery } from "@tanstack/react-query";
import { getTimelines } from "../../apis/timeline";
import { TimelineGroupType } from "../../shared/api/types/timeline";

export const useTimelineQuery = () => {
  return {
    useGetTimelines: ({
      queryParams,
    }: {
      queryParams?: {
        groupType: TimelineGroupType;
      };
    }) => {
      const { data } = useQuery({
        queryKey: ["projects"],
        queryFn: () => getTimelines({ queryParams }),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
