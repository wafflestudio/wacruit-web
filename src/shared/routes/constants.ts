export const PATH = {
  HOME_V2: "/v2",
  RECRUITING_LIST: "/recruiting",
  ANNOUNCEMENT: "/announcement",
  RECRUITING_INFO: "/recruiting-info",
  RECRUITING_DETAIL: "/recruiting/:recruit_id",
  PROJECT_LIST: "/projects",
  REVIEW_LIST: "/reviews,",
};

export const CREATE_PATH = {
  RECRUITING_DETAIL: ({ recruitId }: { recruitId: number }) =>
    `recruiting/${recruitId}`,
};
