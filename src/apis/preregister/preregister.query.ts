import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getActivePreregisterInfo,
  getPreregisterList,
  getPreregisterUsers,
  patchPreregister,
  postPreregisterEmail,
  postPreregisterUser,
} from "./preregister.api";
import type { PreRegisterUserListParams } from "./preregister.types";

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
    useGetPreRegisterList: () =>
      useQuery({
        queryKey: ["pre-registration", "list"],
        queryFn: getPreregisterList,
      }),
    useGetPreRegisterUsers: (params: PreRegisterUserListParams) =>
      useQuery({
        queryKey: ["pre-registration", "users", params],
        queryFn: () => getPreregisterUsers(params),
        keepPreviousData: true,
      }),
    usePatchPreRegister: () => {
      const queryClient = useQueryClient();

      // 활성화 여부가 바뀌면 공개 페이지의 사전등록 CTA에도 영향이 있으므로 함께 무효화
      return useMutation(patchPreregister, {
        onSuccess: () => queryClient.invalidateQueries(["pre-registration"]),
      });
    },
    usePostPreRegisterEmail: () => useMutation(postPreregisterEmail),
  };
};
