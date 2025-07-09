import { useQuery } from "@tanstack/react-query";
import { getActiveRecruitings } from "../../apis/recruiting";

export const useRecruitingQuery = () => {
  return {
    useGetActiveRecruitings: () => {
      const { data } = useQuery({
        queryKey: ["recruitings", "active"],
        queryFn: () => getActiveRecruitings(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
