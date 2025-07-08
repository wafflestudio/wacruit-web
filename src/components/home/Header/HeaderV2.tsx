import styled from "styled-components";
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
      <HeaderContainer>
        <LogoButton onClick={toHomeV2}>
          <img src={"/icon/header/Logo.jpeg"} />
        </LogoButton>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <LogoButton onClick={toHomeV2}>
        <img src={"/icon/header/Logo.jpeg"} />
      </LogoButton>
      <NavButtonGroup>
        {authState === "valid" ? (
          <NavButton
            onClick={() => {
              tryLogout();
              toHomeV2();
            }}
          >
            <img src={"/icon/header/Logout.svg"} />
            로그아웃
          </NavButton>
        ) : (
          <NavButton
            onClick={() => {
              tryLogin("home");
            }}
          >
            <img src={"/icon/header/Login.svg"} />
            로그인
          </NavButton>
        )}
        <NavButton onClick={toRecruitingList}>
          <img src={"/icon/header/Apply.svg"} />
          지원페이지
        </NavButton>
        <NavButton onClick={toAnnouncement}>
          <img src={"/icon/header/Alarm.svg"} />
          공지사항
        </NavButton>
      </NavButtonGroup>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    height: 27px;
  }
`;

const NavButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  border: none;
  background: none;
  cursor: pointer;
  color: #333;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: #0070f3;
  }
`;
