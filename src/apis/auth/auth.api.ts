import Cookies from "js-cookie";
import { BASE_URL, SSO_LOGIN_URL, SSO_REDIRECT_URL } from "../environment";
import { getRequest, postRequest } from "../utility";
import { CheckEmailRequest, LoginRequest, LoginResponse } from "./auth.types";

const COOKIE_KEY = "waffle.access-token";
const REFRESH_COOKIE_KEY = "waffle.refresh-token";

const IS_SECURE = window.location.protocol === "https:";
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  secure: IS_SECURE,
  sameSite: "Lax",
};

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

export const postLogin = (data: LoginRequest): Promise<LoginResponse> =>
  postRequest<LoginResponse>("/v3/auth/login", data, {}, false);

export const postCheckEmail = (data: CheckEmailRequest): Promise<string> =>
  postRequest<string>("/v3/auth/check", data, {}, false);

export const getToken = (): string | null => {
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;
  if (externalToken) return externalToken;

  const token = Cookies.get(COOKIE_KEY);
  return token ?? null;
};

export const deleteToken = () => {
  Cookies.remove(COOKIE_KEY, COOKIE_OPTIONS);
  Cookies.remove(REFRESH_COOKIE_KEY, COOKIE_OPTIONS);
};

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

export const checkAuth = (): Promise<"invalid" | "valid" | "need_register"> =>
  getRequest<{ signup: boolean }>("/v1/users/check").then(
    (res) => (res.signup ? ("valid" as const) : ("need_register" as const)),
    () => Promise.resolve("invalid" as const),
  );
