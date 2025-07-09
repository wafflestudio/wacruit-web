import styled from "styled-components";
import { useState } from "react";
import { ASSET_PATH } from "../assets/constants";
import { HeaderRecruitingCTAButton } from "./HeaderRecruitingCTAButton";
import { HamburgerButton } from "./HamburgerButton";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderContainer isOpen={isOpen}>
        <HeaderGroupContainer>
          <LogoButton onClick={toHome}>
            <img src={isOpen ? ASSET_PATH.LOGO.BLACK : ASSET_PATH.LOGO.WHITE} />
          </LogoButton>
          <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </HeaderGroupContainer>
      </HeaderContainer>
      <MobileDashboard isOpen={isOpen}>
        <NavButtonGroup>
          {navButtons.map(({ label, onAction, selected }, idx) => (
            <NavButton
              key={`nav-button-${idx}`}
              onClick={() => {
                onAction();
                setIsOpen(false);
              }}
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
        </NavButtonGroup>
      </MobileDashboard>
    </>
  );
};

const HeaderContainer = styled.header<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  padding: 1.2rem 0;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.white : theme.colors.black[900]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
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

const MobileDashboard = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 40;
  padding: 0 2rem;
  padding-top: 4.8rem;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const NavButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button<{ selected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes[18]};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.black[900]};
  font-weight: ${({ selected, theme }) =>
    selected ? theme.fontWeights.bold : theme.fontWeights.medium};
  text-align: left;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black[700]};
  }
`;
