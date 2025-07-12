import { getSsoUtils } from "../../../entities/lib/sso";
import { useAuthQuery } from "../../../entities/auth/useAuthQuery";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { DesktopHeader } from "./DesktopHeader";
import { useRouteLocation } from "../../routes/useRouteLocation";
import { PATH } from "../../routes/constants";
import { MobileHeader } from "./MobileHeader";

export default function Headerv2() {
  const { toHomeV2, toRecruitingInfo, toProjectList, toReviewList } =
    useRouteNavigation();
  const { useCheckAuth, useLogout } = useAuthQuery();
  const { tryLogin } = getSsoUtils();
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
    tryLogin("home");
  };
  const onLogout = () => {
    tryLogout();
    toHomeV2();
  };

  return (
    <>
      <MobileHeader
        authState={authState}
        navButtons={navButtons}
        onLogout={onLogout}
        onLogin={onLogin}
        toHome={toHomeV2}
      />
      <DesktopHeader
        authState={authState}
        navButtons={navButtons}
        onLogout={onLogout}
        onLogin={onLogin}
        toHome={toHomeV2}
      />
    </>
  );
}
