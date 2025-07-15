import { useNavigate } from "react-router-dom";
import { PATH, CREATE_PATH } from "./constants";

export const useRouteNavigation = () => {
  const navigation = useNavigate();
  const {
    HOME_V2,
    ANNOUNCEMENT,
    RECRUITING_LIST,
    RECRUITING_INFO,
    PROJECT_LIST,
    REVIEW_LIST,
  } = PATH;
  const { RECRUITING_DETAIL, PROJECT_DETAIL } = CREATE_PATH;

  return {
    toHomeV2: () => {
      void navigation(HOME_V2);
    },
    toRecruitingInfo: () => {
      void navigation(RECRUITING_INFO);
    },
    toProjectList: () => {
      void navigation(PROJECT_LIST);
    },
    toProjectDetail: ({ projectId }: { projectId: number }) => {
      void navigation(PROJECT_DETAIL({ projectId }));
    },
    toReviewList: () => {
      void navigation(REVIEW_LIST);
    },
    toAnnouncement: () => {
      void navigation(ANNOUNCEMENT);
    },
    toRecruitingList: () => {
      void navigation(RECRUITING_LIST);
    },
    toRecruitingDetail: ({ recruitId }: { recruitId: number }) => {
      void navigation(RECRUITING_DETAIL({ recruitId }));
    },
  };
};
