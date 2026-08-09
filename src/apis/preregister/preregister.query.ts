import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getActivePreregisterInfo,
  postPreregisterUser,
} from "./preregister.api";

export const usePreRegisterQuery = () => {
  return {
    useGetActivePreRegisterInfo: () => {
      const { data, isError, isLoading } = useQuery({
        queryKey: ["pre-registration", "active"],
        queryFn: () => getActivePreregisterInfo(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data, isError, isLoading };
    },
    usePostPreRegisterUser: () => {
      const { mutate, isLoading, isSuccess, isError, reset } =
        useMutation(postPreregisterUser);

      return { mutate, isLoading, isSuccess, isError, reset };
    },
  };
};
