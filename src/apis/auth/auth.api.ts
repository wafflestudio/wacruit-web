import Cookies from "js-cookie";
import { BASE_URL } from "../environment";
import { postRequest } from "../utility";
import {
  CheckEmailRequest,
  LoginRequest,
  LoginResponse,
  PasswordResetEmailRequest,
  PasswordResetRequest,
  PasswordResetVerifyRequest,
} from "./auth.types";

const COOKIE_KEY = "waffle.access-token";
const REFRESH_COOKIE_KEY = "waffle.refresh-token";

const IS_SECURE = window.location.protocol === "https:";
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  secure: IS_SECURE,
  sameSite: "Lax",
};

// 토큰 저장
export const setToken = (token: string) => {
  Cookies.set(COOKIE_KEY, token, { ...COOKIE_OPTIONS, expires: 1 });
};

export const setRefreshToken = (token: string) => {
  Cookies.set(REFRESH_COOKIE_KEY, token, { ...COOKIE_OPTIONS, expires: 7 });
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

export const postPasswordResetEmail = (
  data: PasswordResetEmailRequest,
): Promise<void> =>
  postRequest<void>("/v3/auth/password-reset/email", data, {}, false);

export const postPasswordResetVerify = (
  data: PasswordResetVerifyRequest,
): Promise<void> =>
  postRequest<void>("/v3/auth/password-reset/verify", data, {}, false);

export const postPasswordReset = (data: PasswordResetRequest): Promise<void> =>
  postRequest<void>("/v3/auth/password-reset", data, {}, false);

export const getToken = (): string | null => {
  //로컬 환경에서는 환경변수로 지정한 토큰 사용
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;
  if (externalToken) return externalToken;

  //쿠키에 저장된 토큰 사용
  const token = Cookies.get(COOKIE_KEY);
  return token ?? null;
};

export const deleteToken = () => {
  Cookies.remove(COOKIE_KEY, COOKIE_OPTIONS);
  Cookies.remove(REFRESH_COOKIE_KEY, COOKIE_OPTIONS);
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
  const redirectPath =
    recruit_id === "home" ? "/" : `/recruiting/${recruit_id}`;
  location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
};

export const checkAuth = (): Promise<"invalid" | "valid"> => {
  return Promise.resolve(getToken() ? "valid" : "invalid");
};
