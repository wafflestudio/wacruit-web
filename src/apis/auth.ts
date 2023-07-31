const TOKEN_KEY = "wacruit";

export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string => {
  const externalToken = import.meta.env.VITE_EXTERNAL_AUTH_TOKEN;

  if (externalToken) {
    return `Bearer ${externalToken}`;
  } else {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return `Bearer ${token ?? ""}`;
  }
};
