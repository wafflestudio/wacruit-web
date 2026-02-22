export const PATH = {
  HOME_V2: "",
  RECRUITING_LIST: "/recruiting",
  ANNOUNCEMENT: "/announcement",
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGIN_REDIRECT: "/login-redirect",
  RECRUITING_INFO: "/recruiting-info",
  RECRUITING_DETAIL: "/recruiting/:recruit_id",
  RECRUITING_PROGRAMMERS_DETAIL: "/recruiting/programmers/:recruit_id",
  PROJECT_LIST: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  REVIEW_LIST: "/reviews",
  MEMBER: "/members",
};

export const CREATE_PATH = {
  RECRUITING_DETAIL: ({ recruitId }: { recruitId: number }) =>
    `/recruiting/${recruitId}`,
  PROJECT_DETAIL: ({ projectId }: { projectId: number }) =>
    `/projects/${projectId}`,
};
