import { useQuery } from "@tanstack/react-query";
import { getActiveRecruitings, getRecruitingInfo } from "../../apis/recruiting";

export const useRecruitingQuery = () => {
  return {
    useGetActiveRecruitings: () => {
      const { data, isError } = useQuery({
        queryKey: ["recruitings", "active"],
        queryFn: () => getActiveRecruitings(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError };
    },
    useRecruitingTimelineInfo: () => {
      const { data } = useQuery({
        queryKey: ["recruiting", "info"],
        queryFn: () => getRecruitingInfo(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
