import { PATH } from "./constants";

export const isRecruitingApplyPath = (path: string) =>
  path === PATH.RECRUITING_LIST || path.startsWith(`${PATH.RECRUITING_LIST}/`);

export const isRecruitingSectionPath = (path: string) =>
  path === PATH.RECRUITING_INFO ||
  path === PATH.ANNOUNCEMENT ||
  isRecruitingApplyPath(path);
