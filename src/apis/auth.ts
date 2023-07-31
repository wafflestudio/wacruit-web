const TOKEN_KEY = "wacruit";

export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string => {
  if (import.meta.env.VITE_EXTERNAL_TOKEN) {
    return `Bearer ${import.meta.env.VITE_EXTERNAL_TOKEN}`;
  } else {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return `Bearer ${token ?? ""}`;
  }
};
