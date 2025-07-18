import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../apis/question";

export const useQuestionQuery = () => {
  return {
    useGetRecruitingQuestions: () => {
      const { data, isError } = useQuery({
        queryKey: ["questions"],
        queryFn: () => getQuestions(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError };
    },
  };
};
