export const getRequest = <Response>(
  url: string,
  header: HeadersInit = {},
): Promise<Response> =>
  fetch(url, { headers: header }).then((res) => res.json());
