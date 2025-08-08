import styled from "styled-components";

export const HamburgerButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
}) => {
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <HamburgerContainer onClick={toggleMenu}>
      <Bar $isOpen={isOpen} $position="top" />
      <Bar $isOpen={isOpen} $position="middle" />
      <Bar $isOpen={isOpen} $position="bottom" />
    </HamburgerContainer>
  );
};

const HamburgerContainer = styled.div`
  width: 1.8rem;
  height: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Bar = styled.div<{
  $isOpen: boolean;
  $position: "top" | "middle" | "bottom";
}>`
  height: 0.2rem;
  width: 100%;
  background-color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.black[900] : theme.colors.white};
  transition: 0.3s ease;

  ${({ $isOpen, $position }) => {
    if (!$isOpen) {
      return "";
    }
    if ($position === "top") {
      return `transform: rotate(45deg) translateY(0.8rem);`;
    }
    if ($position === "middle") {
      return `opacity: 0;`;
    }
    if ($position === "bottom") {
      return `transform: rotate(-45deg) translateY(-0.8rem);`;
    }
    return "";
  }}
`;
