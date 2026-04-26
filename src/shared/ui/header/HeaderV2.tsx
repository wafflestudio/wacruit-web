import { useAuthQuery } from "../../../apis/auth/auth.query";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { DesktopHeader } from "./DesktopHeader";
import { useRouteLocation } from "../../routes/useRouteLocation";
import { PATH } from "../../routes/constants";
import { MobileHeader } from "./MobileHeader";

export default function Headerv2() {
  const { toHomeV2, toRecruitingInfo, toProjectList, toReviewList, toLogin } =
    useRouteNavigation();
  const { useCheckAuth, useLogout } = useAuthQuery();
  const { path: currentPath } = useRouteLocation();

  const { data: authState } = useCheckAuth();
  const { mutation: tryLogout } = useLogout();

  const navButtons = [
    {
      label: "소개",
      onAction: toHomeV2,
      selected: currentPath === PATH.HOME_V2,
    },
    {
      label: "리크루팅",
      onAction: toRecruitingInfo,
      selected: currentPath === PATH.RECRUITING_INFO,
    },
    {
      label: "프로젝트",
      onAction: toProjectList,
      selected: currentPath === PATH.PROJECT_LIST,
    },
    {
      label: "후기",
      onAction: toReviewList,
      selected: currentPath === PATH.REVIEW_LIST,
    },
  ];
  const onLogin = () => {
    toLogin();
  };
  const onLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      tryLogout();
      toHomeV2();
    }
  };

  const isLoginPage = currentPath === PATH.LOGIN || currentPath === PATH.SIGNUP;

  return (
    <>
      <MobileHeader
        authState={authState}
        navButtons={navButtons}
        onLogout={onLogout}
        onLogin={onLogin}
        toHome={toHomeV2}
        isLoginPage={isLoginPage}
      />
      <DesktopHeader
        authState={authState}
        navButtons={navButtons}
        onLogout={onLogout}
        onLogin={onLogin}
        toHome={toHomeV2}
        isLoginPage={isLoginPage}
      />
    </>
  );
}
