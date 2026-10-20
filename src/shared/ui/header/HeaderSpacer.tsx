import styled from "styled-components";
import { useRouteLocation } from "../../routes/useRouteLocation";
import { isRecruitingSectionPath } from "../../routes/recruitingRoute";
import { HEADER_HEIGHT, RECRUITING_TABS_HEIGHT } from "./headerLayout";

export default function HeaderSpacer() {
  const { path } = useRouteLocation();
  return (
    <Spacer aria-hidden="true" $withTabs={isRecruitingSectionPath(path)} />
  );
}

const Spacer = styled.div<{ $withTabs: boolean }>`
  flex-shrink: 0;
  height: ${({ $withTabs }) =>
    $withTabs
      ? `calc(${HEADER_HEIGHT.desktop} + ${RECRUITING_TABS_HEIGHT})`
      : HEADER_HEIGHT.desktop};

  @media (max-width: 768px) {
    height: ${({ $withTabs }) =>
      $withTabs
        ? `calc(${HEADER_HEIGHT.mobile} + ${RECRUITING_TABS_HEIGHT})`
        : HEADER_HEIGHT.mobile};
  }
`;
