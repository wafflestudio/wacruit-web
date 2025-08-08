import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth } from "../../apis/auth";
import { getSsoUtils } from "../lib/sso";

export const useAuthQuery = () => {
  const queryClient = useQueryClient();

  const { deleteSsoToken } = getSsoUtils();
  return {
    useCheckAuth: () => {
      const { data, isError } = useQuery({
        queryKey: ["auth"],
        queryFn: () => checkAuth(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError };
    },
    useLogout: () => {
      return {
        mutation: () => {
          deleteSsoToken();
          queryClient.invalidateQueries(["auth"]);
        },
      };
    },
  };
};
