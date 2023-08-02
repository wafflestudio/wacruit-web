export const baseURL =
  import.meta.env.VITE_API_TYPE === "MSW"
    ? ""
    : "https://wacruit-dev.wafflestudio.com/api/v1";

export const ssoLoginURL =
  import.meta.env.VITE_API_TYPE === "MSW"
    ? ""
    : "https://sso-dev.wafflestudio.com/?redirect_uri=";

export const ssoRedirectURI = (recruitId: number | "home") =>
  `https://wacruit-dev.wafflestudio.com/sso/${recruitId}`;
