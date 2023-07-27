export const getRequest = <Response>(
  url: string,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(url, { headers: header }).then((res) => res.json());

const defaultPostHeader = {
  "Content-Type": "application/json",
};

export const postRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(url, {
    method: "POST",
    headers: { ...defaultPostHeader, ...header },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const putRequest = <Response>(
  url: string,
  body: object,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(url, {
    method: "PUT",
    headers: { ...defaultPostHeader, ...header },
    body: JSON.stringify(body),
  }).then((res) => res.json());
