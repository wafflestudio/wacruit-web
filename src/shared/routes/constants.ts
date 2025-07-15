export const PATH = {
  HOME_V2: "/v2",
  RECRUITING_LIST: "/recruitings",
  ANNOUNCEMENT: "/announcement",
  PROJECT_LIST: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  REVIEW_LIST: "/reviews",
  MEMBER: "/members",
  RECRUITING_INFO: "/recruiting-info",
  RECRUITING_DETAIL: "/recruiting/:recruit_id",
};

export const CREATE_PATH = {
  RECRUITING_DETAIL: ({ recruitId }: { recruitId: number }) =>
    `/recruiting/${recruitId}`,
  PROJECT_DETAIL: ({ projectId }: { projectId: number }) =>
    `/projects/${projectId}`,
};
