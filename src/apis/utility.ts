import { getSsoToken } from "./auth";
import { BASE_URL } from "./environment";

const defaultCommonHeader = {};

const authorizedHeader = (token: string | null) => {
  if (token === null) {
    return undefined;
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

const defaultPostHeader = {
  "Content-Type": "application/json",
};

const safelyReturnResponse = (res: Response) =>
  res.ok
    ? res.status === 204
      ? Promise.resolve(res)
      : res.json()
    : Promise.reject(res);

export const getRequest = <Response>(
  url: string,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${BASE_URL}${url}`, {
    headers: {
      ...defaultCommonHeader,
      ...header,
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
  }).then(safelyReturnResponse);

export const postRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
    body: JSON.stringify(body),
  }).then(safelyReturnResponse);

export const putRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
    body: JSON.stringify(body),
  }).then(safelyReturnResponse);

export const patchRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${BASE_URL}${url}`, {
    method: "PATCH",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
    body: JSON.stringify(body),
  }).then(safelyReturnResponse);

export const deleteRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
): Promise<Response> =>
  fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      ...defaultCommonHeader,
      ...defaultPostHeader,
      ...header,
      ...(authorized ? authorizedHeader(getSsoToken()) : {}),
    },
    body: JSON.stringify(body),
  }).then(safelyReturnResponse);

// EventSource API는 POST를 지원하지 않기 때문에 대충 파싱한다
export const sseRequest = <Response extends { type: string; data: unknown }>(
  url: string,
  body: object,
  header: HeadersInit = {},
  authorized = true,
  method: "GET" | "POST" = "POST",
): AsyncIterable<Response> => ({
  async *[Symbol.asyncIterator]() {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        ...defaultCommonHeader,
        ...defaultPostHeader,
        ...header,
        ...(authorized ? authorizedHeader(getSsoToken()) : {}),
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
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
        data: tryParseData(event.data),
      } as Response;
    }
  },
});

function tryParseData(data: string) {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

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
        lines.find((line) => line.startsWith("event:"))?.slice(6) ?? "unknown",
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

export const encodeQueryParams = ({
  params,
}: {
  params: Record<
    string,
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | null
    | undefined
  >;
}) => {
  const queryParameters = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return; // null, undefined 제외

    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryParameters.append(key, v.toString());
      });
    } else {
      queryParameters.append(key, value.toString());
    }
  });

  return queryParameters.toString();
};
