import Cookies from "js-cookie";
import { SSO_LOGIN_URL, SSO_REDIRECT_URL } from "./environment";
import { getRequest } from "./utility";

const SSO_COOKIE_KEY = "waffle.access-token";

// TODO: checkAuth 빼고 추후 모두 삭제 필요
export const getSsoToken = (): string | null => {
  //로컬 환경에서는 환경변수로 지정한 토큰 사용
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;
  if (externalToken) return externalToken;

  //쿠키에 저장된 토큰 사용
  const token = Cookies.get(SSO_COOKIE_KEY);
  return token ?? null;
};

export const deleteSsoToken = () => {
  Cookies.remove(SSO_COOKIE_KEY, { path: "/", domain: ".wafflestudio.com" });
};

export const tryLogin = (recruit_id: number | "home") => {
  location.href = `${SSO_LOGIN_URL}/?redirect_uri=${SSO_REDIRECT_URL}/${recruit_id}`;
};

// DESCRIPTION: 유일하게 API인 부분이므로 남겨둠.
export const checkAuth = (): Promise<"invalid" | "valid" | "need_register"> =>
  getRequest<{ signup: boolean }>("/v1/users/check").then(
    (res) => (res.signup ? ("valid" as const) : ("need_register" as const)),
    () => Promise.resolve("invalid" as const),
  );
