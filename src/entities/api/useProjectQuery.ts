import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../apis/project";

export const useProjectQuery = () => {
  return {
    useGetProjects: ({
      queryParams,
    }: {
      queryParams?: {
        offset: number;
        limit: number;
      };
    }) => {
      const { data } = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects({ queryParams }),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
