import { useQuery } from "@tanstack/react-query";
import { getActiveSeminarList } from "./seminar.api";

export const useSeminarQuery = () => {
  return {
    useGetActiveSeminars: () => {
      const { data, isError } = useQuery({
        queryKey: ["seminars"],
        queryFn: () => getActiveSeminarList(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError };
    },
  };
};
