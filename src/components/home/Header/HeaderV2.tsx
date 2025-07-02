import { getSsoUtils } from "../../../entities/lib/sso";
import { useAuthQuery } from "../../../entities/auth/useAuthQuery";
import { useRouteNavigation } from "../../../shared/routes/useRouteNavigation";

export default function Headerv2() {
  const { toHomeV2, toAnnouncement, toRecruitingList } = useRouteNavigation();
  const { useCheckAuth, useLogout } = useAuthQuery();
  const { tryLogin } = getSsoUtils();

  const { data: authState } = useCheckAuth();
  const { mutation: tryLogout } = useLogout();

  if (!authState) {
    return (
      <div>
        <button onClick={toHomeV2}>
          <img src={"/icon/header/Logo.jpeg"} height={27} />
        </button>
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
              tryLogout();
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
