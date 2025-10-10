import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { tryLogin } from "../apis/auth";

export default function LoginRedirect() {
  const [params] = useSearchParams();
  const to = params.get("to") ?? "home";
  useEffect(() => {
    tryLogin(to === "home" ? "home" : Number(to));
  }, [to]);
  return null;
}
