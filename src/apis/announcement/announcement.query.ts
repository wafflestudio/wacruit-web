import { useQuery } from "@tanstack/react-query";
import { getPinnedAnnouncements } from "./announcement.api";

export const useAnnouncementQuery = () => {
  return {
    useGetPinnedAnnouncements: () => {
      const { data, isError, isLoading } = useQuery({
        queryKey: ["announcement", "pinned"],
        queryFn: () => getPinnedAnnouncements(),
        staleTime: 1000 * 60 * 5,
        retry: 0,
      });

      return { data, isError, isLoading };
    },
  };
};
