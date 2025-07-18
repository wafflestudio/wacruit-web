import { useRef } from "react";
import styled from "styled-components";
import { Confetti } from "./Confetti";

export const HeroSection = () => {
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroContainer>
        <HeroContent>
          <Logo>Waffle Studio</Logo>
          <ScrollArrow onClick={scrollToNext} />
        </HeroContent>
        <Confetti />
        {/* 다음 섹션 스크롤링을 위한 더미 div */}
      </HeroContainer>
      <div ref={nextSectionRef}></div>
    </>
  );
};

const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  background: ${({ theme }) => theme.colors.lime};
  display: flex;
  padding: 3.5rem;
  padding-top: 8.3rem;
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: flex;
  align
  gap: 1rem;
  z-index: 10;
`;

const Logo = styled.div`
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.black[100]};
  text-align: left;
  font-size: 12rem;
  height: fit-content;
  padding: 1rem;
`;

const ScrollArrow = styled.div`
  width: 14rem;
  height: 14rem;
  background: ${({ theme }) => theme.colors.black[700]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black[500]};
  }
`;
