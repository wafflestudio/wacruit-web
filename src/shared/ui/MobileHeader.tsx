import styled from "styled-components";
import { ASSET_PATH } from "../assets/constants";
import { HeaderRecruitingCTAButton } from "./HeaderRecruitingCTAButton";

export const MobileHeader = ({
  authState,
  navButtons,
  onLogout,
  onLogin,
  toHome,
}: {
  authState: "invalid" | "valid" | "need_register" | undefined;
  navButtons: { label: string; onAction: () => void; selected: boolean }[];
  onLogout: () => void;
  onLogin: () => void;
  toHome: () => void;
}) => {
  return (
    <HeaderContainer>
      <HeaderGroupContainer>
        <LogoButton onClick={toHome}>
          <img src={ASSET_PATH.LOGO.WHITE} />
        </LogoButton>
        {/* <NavButtonGroup>
          {navButtons.map(({ label, onAction, selected }, idx) => (
            <NavButton
              key={`nav-button-${idx}`}
              onClick={onAction}
              selected={selected}
            >
              {label}
            </NavButton>
          ))}
          {authState === "valid" ? (
            <NavButton onClick={onLogout}>로그아웃</NavButton>
          ) : (
            <NavButton onClick={onLogin}>로그인</NavButton>
          )}
        </NavButtonGroup> */}
        <button>
          <img src={ASSET_PATH.HAMBURGER} />
        </button>
      </HeaderGroupContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  padding: 1.2rem 0;
  background-color: ${({ theme }) => theme.colors.black[900]};
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  max-width: 1200px;
`;

const LogoButton = styled.button`
  cursor: pointer;

  img {
    height: 2rem;
  }
`;
