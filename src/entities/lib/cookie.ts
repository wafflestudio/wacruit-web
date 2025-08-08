import Cookies from "js-cookie";

export const getCookieUtils = () => {
  return {
    getCookie: ({ key }: { key: string }) => {
      return Cookies.get(key);
    },
    removeCookie: ({
      key,
      path,
      domain,
    }: {
      key: string;
      path: string;
      domain: string;
    }) => {
      Cookies.remove(key, {
        path,
        domain,
      });
    },
  };
};
