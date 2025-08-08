import { type ReactNode } from "react";
import styled, { css } from "styled-components";
import { fadeInUp } from "../animation/StyledAnimation";

export const MobileNavButton = ({
  children,
  onClick,
  selected,
  isOpen,
  index,
  isVisible,
}: {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
  isOpen: boolean;
  index: number;
  isVisible: boolean;
}) => {
  return (
    <NavButtonContainer
      onClick={onClick}
      selected={selected}
      $isOpen={isOpen}
      $index={index}
      $isVisible={isVisible}
    >
      {children}
    </NavButtonContainer>
  );
};

const NavButtonContainer = styled.button<{
  selected?: boolean;
  $isOpen: boolean;
  $index: number;
  $isVisible: boolean;
}>`
  font-size: ${({ theme }) => theme.fontSizes[18]};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.black[900]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
  text-underline-offset: 0.4rem;
  text-align: left;
  padding: 1rem;
  cursor: pointer;
  animation: ${({ $isVisible }) =>
    $isVisible
      ? css`
          ${fadeInUp} 0.8s ease forwards
        `
      : "none"};
  animation-delay: ${({ $index }) => `${$index * 0.1}s`};

  &:hover {
    color: ${({ theme }) => theme.colors.black[700]};
  }
`;
