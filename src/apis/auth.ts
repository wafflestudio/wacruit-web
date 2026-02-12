import Cookies from "js-cookie";
import { BASE_URL, SSO_LOGIN_URL, SSO_REDIRECT_URL } from "./environment";
import { getRequest, postRequest } from "./utility";
import {
  CheckEmailRequest,
  LoginRequest,
  LoginResponse,
} from "../types/apiTypes";

const COOKIE_KEY = "waffle.access-token";
const REFRESH_COOKIE_KEY = "waffle.refresh-token";

// 토큰 저장
export const setToken = (token: string) => {
  Cookies.set(COOKIE_KEY, token, { path: "/" });
};

export const setRefreshToken = (token: string) => {
  Cookies.set(REFRESH_COOKIE_KEY, token, { path: "/" });
};

export const getRefreshToken = (): string | null => {
  const token = Cookies.get(REFRESH_COOKIE_KEY);
  return token ?? null;
};

// 로그인 API
export const postLogin = (data: LoginRequest): Promise<LoginResponse> =>
  postRequest<LoginResponse>("/v3/auth/login", data, {}, false);

// 이메일 중복 체크 API
export const postCheckEmail = (data: CheckEmailRequest): Promise<string> =>
  postRequest<string>("/v3/auth/check", data, {}, false);

export const getToken = (): string | null => {
  //로컬 환경에서는 환경변수로 지정한 토큰 사용
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;
  if (externalToken) return externalToken;

  //쿠키에 저장된 토큰 사용
  const token = Cookies.get(COOKIE_KEY);
  return token ?? null;
};

export const deleteToken = () => {
  Cookies.remove(COOKIE_KEY, { path: "/" });
  Cookies.remove(REFRESH_COOKIE_KEY, { path: "/" });
};

// 토큰 갱신
// 여러 API가 동시에 401을 받아도 refresh 요청은 1번만 보냄
let refreshPromise: Promise<LoginResponse> | null = null;

export const refreshTokens = async (): Promise<LoginResponse> => {
  if (refreshPromise) return refreshPromise;

  const refreshToken = getRefreshToken();
  if (!refreshToken) return Promise.reject(new Error("No refresh token"));

  refreshPromise = fetch(`${BASE_URL}/v3/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw res;
      return res.json() as Promise<LoginResponse>;
    })
    .then((data) => {
      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      return data;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
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
