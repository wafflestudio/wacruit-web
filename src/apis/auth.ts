import Cookies from "js-cookie";
import { ssoLoginURL, ssoRedirectURI } from "./environment";
import { getRequest } from "./utility";

const SSO_COOKIE_KEY = "waffle.access-token";

export const getSsoToken = (): string | null => {
  //로컬 환경에서는 환경변수로 지정한 토큰 사용
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;
  if (externalToken) return externalToken;

  //쿠키에 저장된 토큰 사용
  const token = Cookies.get(SSO_COOKIE_KEY);
  return token ?? null;
};

export const deleteSsoToken = () => {
  Cookies.remove(SSO_COOKIE_KEY);
};

export const tryLogin = (recruit_id: number | "home") => {
  location.href = `${ssoLoginURL}${ssoRedirectURI(recruit_id)}`;
};

export const checkAuth = (): Promise<"invalid" | "valid" | "need_register"> =>
  getRequest<{ signup: boolean }>("/users/check").then(
    (res) => (res.signup ? ("valid" as const) : ("need_register" as const)),
    () => Promise.resolve("invalid" as const),
  );
