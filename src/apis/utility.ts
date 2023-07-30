import { baseURL } from "./environment";

const defaultCommonHeader = {
  "Access-Control-Allow-Origin": "*",
};

const defaultPostHeader = {
  "Content-Type": "application/json",
};

export const getRequest = <Response>(
  url: string,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(`${baseURL}${url}`, { ...defaultCommonHeader, headers: header }).then(
    (res) => res.json(),
  );

export const postRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    method: "POST",
    headers: { ...defaultCommonHeader, ...defaultPostHeader, ...header },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const putRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    method: "PUT",
    headers: { ...defaultCommonHeader, ...defaultPostHeader, ...header },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const patchRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(url, {
    method: "PATCH",
    headers: { ...defaultPostHeader, ...header },
    body: JSON.stringify(body),
  }).then((res) => res.json());
