import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, deleteToken } from "../../apis/auth";

export const useAuthQuery = () => {
  const queryClient = useQueryClient();

  return {
    useCheckAuth: () => {
      const { data, isError } = useQuery({
        queryKey: ["auth"],
        queryFn: () => {
          const token = getToken();
          if (token) return "valid" as const;
          return "invalid" as const;
        },
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError };
    },
    useLogout: () => {
      return {
        mutation: () => {
          deleteToken();
          queryClient.invalidateQueries(["auth"]);
        },
      };
    },
  };
};
