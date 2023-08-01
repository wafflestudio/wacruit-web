import { Cookies } from "react-cookie";
import { getRecruitingById } from "./recruiting";
import { ssoLoginURL, ssoRedirectURI } from "./environment";

const SSO_COOKIE_KEY = "waffle.access-token";
const TOKEN_KEY = "wacruit";

const cookies = new Cookies();

export const getCookie = () => {
  return cookies.get(SSO_COOKIE_KEY);
};

export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string => {
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;

  if (externalToken) {
    return `Bearer ${externalToken}`;
  } else {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return `Bearer ${token ?? ""}`;
  }
};

export const deleteSsoToken = () => {
  cookies.remove(SSO_COOKIE_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export const saveSsoToken = () => {
  const token = getCookie();
  console.log(cookies);
  console.log(token);
  if (token) {
    setToken(token);
  }
};

export const tryLogin = (recruit_id: number | "home") => {
  location.href = `${ssoLoginURL}${ssoRedirectURI(recruit_id)}`;
};

export const checkAuth = async (): Promise<
  "invalid" | "valid" | "need_register"
> => {
  const result = await getRecruitingById(1).then(
    () => "valid" as const,
    (error) =>
      error.detail === "권한이 없습니다."
        ? ("need_register" as const)
        : ("invalid" as const),
  );
  return result;
};
