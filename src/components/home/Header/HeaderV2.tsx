import { useQuery } from "@tanstack/react-query";
import { checkAuth, deleteSsoToken, tryLogin } from "../../../apis/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouteNavigation } from "../../../shared/routes/useRouteNavigation";

export default function Headerv2() {
  const { toHomeV2, toAnnouncement, toRecruitingList } = useRouteNavigation();
  const queryClient = useQueryClient();

  const { data: authState } = useQuery({
    queryKey: ["auth"],
    queryFn: () => checkAuth(),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });

  if (!authState) {
    return (
      <div>
        <button onClick={toHomeV2}>
          <img src={"/icon/header/Logo.jpeg"} height={27} />
        </button>
        <span>로그인 정보 확인 중...</span>
      </div>
    );
  }

  return (
    <div>
      <button onClick={toHomeV2}>
        <img src={"/icon/header/Logo.jpeg"} height={27} />
      </button>
      <div>
        {authState === "valid" ? (
          <button
            onClick={() => {
              deleteSsoToken();
              queryClient.invalidateQueries(["auth"]);
              toHomeV2();
            }}
          >
            <img src={"/icon/header/Logout.svg"} />
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => {
              tryLogin("home");
            }}
          >
            <img src={"/icon/header/Login.svg"} />
            로그인
          </button>
        )}
        <button onClick={toRecruitingList}>
          <img src={"/icon/header/Apply.svg"} />
          지원페이지
        </button>
        <button onClick={toAnnouncement}>
          <img src={"/icon/header/Alarm.svg"} />
          공지사항
        </button>
      </div>
    </div>
  );
}
