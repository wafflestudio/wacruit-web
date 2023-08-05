import { getSsoToken } from "./auth";
import { baseURL } from "./environment";

const defaultCommonHeader = {};

const authorizedHeader = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});

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
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
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
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
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
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
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
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

export const deleteRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${baseURL}${url}`, {
    method: "DELETE",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

// EventSource API는 POST를 지원하지 않기 때문에 대충 파싱한다
export const sseRequest = <Response extends { type: string; data: unknown }>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): AsyncIterable<Response> => ({
  async *[Symbol.asyncIterator]() {
    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        ...defaultCommonHeader,
        ...defaultPostHeader,
        ...header,
        ...(authorized ? authorizedHeader(getSsoToken()) : {}),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw response;
    }
    if (!response.body) {
      throw new Error("No body");
    }
    const reader = response.body
      .pipeThrough(new TextDecoderStream(), { preventAbort: true })
      .getReader();

    for await (const event of parseEvent(reader)) {
      yield {
        type: event.type,
        data: JSON.parse(event.data),
      } as Response;
    }
  },
});

async function* parseLine(reader: ReadableStreamDefaultReader<string>) {
  let lastLine = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const lines = (lastLine + value).split(/\r\n/g);
    lastLine = lines.pop() || "";
    for (const line of lines) {
      yield line;
    }
  }
}

async function* parseEvent(reader: ReadableStreamDefaultReader<string>) {
  let lines = [];
  for await (const line of parseLine(reader)) {
    if (line.length > 0) lines.push(line);
    else {
      const type = removeFirstSpace(
        lines.find((line) => line.startsWith("event:"))?.slice(6) ?? " " + line,
      );
      const data = lines
        .filter((line) => line.startsWith("data:"))
        .map((line) => removeFirstSpace(line.slice(5)))
        .join("\n");
      yield { type, data };
      lines = [];
    }
  }
}

function removeFirstSpace(str: string) {
  return str.startsWith(" ") ? str.slice(1) : str;
}
