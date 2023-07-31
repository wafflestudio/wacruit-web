export const baseURL =
  import.meta.env.VITE_API_TYPE === "MSW"
    ? ""
    : "https://wacruit-dev.wafflestudio.com/api/v1";

export const ssoRedirectURI = (recruitId: number | "home") =>
  `https://wacruit-dev.wafflestudio.com/sso/${recruitId}`;
