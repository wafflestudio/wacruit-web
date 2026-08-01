import { useQuery } from "@tanstack/react-query";
import { getActiveRecruitings, getRecruitingInfo } from "./recruiting.api";

export const useRecruitingQuery = () => {
  return {
    useGetActiveRecruitings: () => {
      const { data, isError, isLoading } = useQuery({
        queryKey: ["recruitings", "active"],
        queryFn: () => getActiveRecruitings(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError, isLoading };
    },
    useGetRecruitingTimelineInfo: () => {
      const { data, isError } = useQuery({
        queryKey: ["recruiting", "info"],
        queryFn: () => getRecruitingInfo(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError };
    },
  };
};
