import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { checkAuth, tryLogin } from "../apis/auth";
import { useEffect } from "react";

export default function Recruit() {
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: () => checkAuth(),
    staleTime: 5000,
    retry: 0,
  });

  useEffect(() => {
    if (data && data !== "valid") {
      alert("다시 로그인해주세요.");
      tryLogin("home");
    }
  }, [data]);

  return (
    <>
      <Outlet />
    </>
  );
}
