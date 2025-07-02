import { useNavigate } from "react-router-dom";
import { PATH } from "./constants";

export const useRouteNavigation = () => {
  const navigation = useNavigate();
  const { HOME_V2, ANNOUNCEMENT, RECRUITING_LIST } = PATH;

  return {
    toHomeV2: () => {
      void navigation(HOME_V2);
    },
    toAnnouncement: () => {
      void navigation(ANNOUNCEMENT);
    },
    toRecruitingList: () => {
      void navigation(RECRUITING_LIST);
    },
  };
};
