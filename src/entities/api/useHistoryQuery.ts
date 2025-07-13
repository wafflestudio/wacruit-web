import { useQuery } from "@tanstack/react-query";
import { getHistories } from "../../apis/history";

export const useHistoryQuery = () => {
  return {
    useGetHistories: () => {
      const { data } = useQuery({
        queryKey: ["histories"],
        queryFn: () => getHistories(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
