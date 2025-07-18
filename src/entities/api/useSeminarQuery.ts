import { useQuery } from "@tanstack/react-query";
import { getSeminarList } from "../../apis/seminar";

export const useSeminarQuery = () => {
  return {
    useSeminarList: () => {
      const { data } = useQuery({
        queryKey: ["seminars"],
        queryFn: () => getSeminarList(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
