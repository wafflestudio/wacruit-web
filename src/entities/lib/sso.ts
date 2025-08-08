import { SSO_LOGIN_URL, SSO_REDIRECT_URL } from "../../apis/environment";
import { getCookieUtils } from "./cookie";

const SSO_COOKIE_KEY = "waffle.access-token";

export const getSsoUtils = () => {
  const { getCookie, removeCookie } = getCookieUtils();
  return {
    getSsoToken: (): string | null => {
      //로컬 환경에서는 환경변수로 지정한 토큰 사용
      const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;
      if (externalToken) return externalToken;

      //쿠키에 저장된 토큰 사용
      const token = getCookie({ key: SSO_COOKIE_KEY });
      return token ?? null;
    },
    deleteSsoToken: () => {
      removeCookie({
        key: SSO_COOKIE_KEY,
        path: "/",
        domain: ".wafflestudio.com",
      });
    },
    tryLogin: (recruit_id: number | "home") => {
      location.href = `${SSO_LOGIN_URL}/?redirect_uri=${SSO_REDIRECT_URL}/${recruit_id}`;
    },
  };
};
