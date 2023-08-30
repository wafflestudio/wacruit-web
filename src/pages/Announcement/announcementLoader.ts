import { getAllAnnouncements } from "../../apis/announcement";
import {
  PageDataLoader,
  createCompositeLoader,
} from "../../lib/animatedTransition/functions/createCompositeLoader";
import { TAnnouncement } from "../../types/apiTypes";
import { LoaderReturnType } from "../../types/commonTypes";

export const allAnnouncementsQuery = {
  queryKey: ["announcement", "all"],
  queryFn: () => getAllAnnouncements(),
  staleTime: 1,
};

const announcementDataLoader: PageDataLoader<{
  annoucements: TAnnouncement[];
}> = (queryClient) => async () => {
  const cachedAnnouncements = queryClient.getQueryData<TAnnouncement[]>(
    allAnnouncementsQuery.queryKey,
  );
  return {
    annoucements:
      cachedAnnouncements !== undefined
        ? cachedAnnouncements
        : await queryClient.fetchQuery(allAnnouncementsQuery),
  };
};

export const announcementLoader = createCompositeLoader(announcementDataLoader);

export type AnnouncementLoaderReturnType = LoaderReturnType<
  typeof announcementLoader
>;
