import { useQuery } from "@tanstack/react-query";
import { getActivePreregisterInfo } from "../../apis/preregister";

export const usePreRegisterQuery = () => {
  return {
    useGetActivePreRegisterInfo: () => {
      const { data } = useQuery({
        queryKey: ["pre-register", "active"],
        queryFn: () => getActivePreregisterInfo(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
      });

      return { data };
    },
  };
};
