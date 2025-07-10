import styled from "styled-components";
import { useState, useRef, type RefObject } from "react";
import { ASSET_PATH } from "../../assets/constants";
import { HamburgerButton } from "./HamburgerButton";
import { MobileNavButton } from "./MoblieNavButton";
import { useIsVisible } from "../../hooks/useIsVisble";

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
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderContainer $isOpen={isOpen}>
        <HeaderGroupContainer>
          <LogoButton onClick={toHome}>
            <img src={isOpen ? ASSET_PATH.LOGO.BLACK : ASSET_PATH.LOGO.WHITE} />
          </LogoButton>
          <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </HeaderGroupContainer>
      </HeaderContainer>
      <MobileDashboard $isOpen={isOpen} ref={ref}>
        <NavButtonGroup>
          {navButtons.map(({ label, onAction, selected }, idx) => (
            <MobileNavButton
              key={`nav-button-${idx}`}
              onClick={() => {
                onAction();
                setIsOpen(false);
              }}
              selected={selected}
              isOpen={isOpen}
              index={idx}
              isVisible={isVisible}
            >
              {label}
            </MobileNavButton>
          ))}
          {authState === "valid" ? (
            <MobileNavButton
              onClick={onLogout}
              isOpen={isOpen}
              index={navButtons.length + 1}
              isVisible={isVisible}
            >
              로그아웃
            </MobileNavButton>
          ) : (
            <MobileNavButton
              onClick={onLogin}
              isOpen={isOpen}
              index={navButtons.length}
              isVisible={isVisible}
            >
              로그인
            </MobileNavButton>
          )}
        </NavButtonGroup>
      </MobileDashboard>
    </>
  );
};

const HeaderContainer = styled.header<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    padding: 1.2rem 0;
    background-color: ${({ theme, $isOpen }) =>
      $isOpen ? theme.colors.white : theme.colors.black[900]};
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
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

const MobileDashboard = styled.div<{
  ref?: RefObject<HTMLDivElement>;
  $isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 40;
  padding: 0 2rem;
  padding-top: 4.8rem;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const NavButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
