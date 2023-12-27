export const BASE_URL =
  import.meta.env.VITE_API_TYPE === "MSW" ? "" : import.meta.env.VITE_BASE_URL;

export const SSO_LOGIN_URL =
  import.meta.env.VITE_API_TYPE === "MSW"
    ? ""
    : import.meta.env.VITE_SSO_LOGIN_URL;

export const SSO_REDIRECT_URL = `${window.location.origin}/sso`;
