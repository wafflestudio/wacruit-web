/**
 * TODO: .env로 빼놓기
 */

export const useMSW = false;
export const baseURL = useMSW
  ? ""
  : "https://wacruit-dev.wafflestudio.com/api/v1";
export const ssoRedirectURI = (recruitId: number) =>
  useMSW
    ? `http://localhost:3000/sso/${recruitId}`
    : `https://wacruit-dev.wafflestudio.com/sso/${recruitId}`;
