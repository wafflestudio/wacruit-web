import { getToken } from "./auth";
import { baseURL } from "./environment";

const defaultCommonHeader = {};

const defaultPostHeader = {
  "Content-Type": "application/json",
};

export const getRequest = <Response>(
  url: string,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    headers: {
      ...defaultCommonHeader,
      ...header,
      ...(authorized ? { Authorization: getToken() } : {}),
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

export const postRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    method: "POST",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? { Authorization: getToken() } : {}),
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

export const putRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    method: "PUT",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? { Authorization: getToken() } : {}),
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

export const patchRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    method: "PATCH",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? { Authorization: getToken() } : {}),
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
