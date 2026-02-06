import styled, { keyframes } from "styled-components";
import { useMemo } from "react";

import RoundGreenSVG from "../../../components/icons/home/hero/RoundGreenDesktop.svg?react";
import TriangleSVG from "../../../components/icons/home/hero/TriangleDesktop2.svg?react";
import WaffleSVG from "../../../components/icons/home/hero/WaffleDesktop.svg?react";
import MixerSVG from "../../../components/icons/home/hero/MixerDesktop.svg?react";
import RoundPinkSVG from "../../../components/icons/home/hero/RoundPinkDesktop.svg?react";
import HalfRoundSVG from "../../../components/icons/home/hero/HalfRoundDesktop.svg?react";
import ArrowDownSVG from "../../../components/icons/home/hero/ArrowDown.svg";

const CONFETTI_COUNT = 20;
const CONFETTI_SIZE = 36;

type ConfettiPieceData = {
  id: number;
  leftPercent: number;
  delay: number;
  duration: number;
  rotation: number;
};

type DesktopHeroProps = {
  onScrollToHistory?: () => void;
};

export const DesktopHero = ({ onScrollToHistory }: DesktopHeroProps) => {
  const confettiPieces = useMemo<ConfettiPieceData[]>(() => {
    return Array.from({ length: CONFETTI_COUNT }, (_, idx) => ({
      id: idx,
      leftPercent: 5 + Math.random() * 90,
      delay: 0.25 + Math.random() * 1.1,
      duration: 2 + Math.random() * 1.6,
      rotation: Math.random() * 90 - 45,
    }));
  }, []);

  return (
    <Container>
      <HeroBackgroundIcon>
        <Scene>
          <HeroItem $name="half" $delay={0.65} $rot={-10}>
            <HalfRoundSVG />
          </HeroItem>

          <HeroItem $name="mixer" $delay={0.5} $rot={14}>
            <MixerSVG />
          </HeroItem>

          <HeroItem $name="pink" $delay={0.63} $rot={-6}>
            <RoundPinkSVG />
          </HeroItem>

          <HeroItem $name="waffle" $delay={0.45} $rot={-8}>
            <WaffleSVG />
          </HeroItem>

          <HeroItem $name="tri" $delay={0.38} $rot={10}>
            <TriangleSVG />
          </HeroItem>

          <HeroItem $name="green" $delay={0.35} $rot={7}>
            <RoundGreenSVG />
          </HeroItem>
        </Scene>
      </HeroBackgroundIcon>

      <ConfettiLayer>
        {confettiPieces.map((piece) => (
          <ConfettiPiece
            key={piece.id}
            leftPercent={piece.leftPercent}
            style={{
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        ))}
      </ConfettiLayer>

      <HeroTitleWrapper>
        <HeroTitle>
          <span>Waffle</span>
          <span>Studio</span>
        </HeroTitle>

        <HeroTitleArrowButton
          type="button"
          onClick={onScrollToHistory}
          aria-label="Scroll to Waffle history section"
        >
          <HeroTitleArrow src={ArrowDownSVG} alt="Scroll down arrow" />
        </HeroTitleArrowButton>
      </HeroTitleWrapper>
    </Container>
  );
};

/* ================= animations ================= */
const dropToFloor = keyframes`
  0% {
    transform: translate3d(-50%, -80vh, 0) rotate(calc(var(--rot) * 1deg));
    opacity: 0;
    filter: blur(2px);
  }
  60% {
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: translate3d(-50%, 0, 0) rotate(0deg);
    opacity: 1;
  }
`;

/* ================= styled ================= */
const Container = styled.section`
  width: 100%;
  min-height: 100svh;
  background-color: #dfffa3;
  position: relative;
  overflow: hidden;
`;

const HeroBackgroundIcon = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Scene = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  --squeeze: clamp(5px, calc((1400px - 100vw) * 0.35), 120px);

  --triShift: calc(var(--squeeze) * 1.15);
  --waffleShift: calc(var(--squeeze) * 0.55);
`;

const HERO_LAYOUT = {
  half: {
    w: "clamp(200px, 14vw, 230px)",
    left: "9%",
    bottom: "clamp(480px, 23vw, 500px)",
  },
  mixer: {
    w: "clamp(590px, 34vw, 610px)",
    left: "19%",
    bottom: "clamp(150px, 20vh, 230px)",
  },
  pink: {
    w: "clamp(210px, 15vw, 225px)",
    left: "clamp(550px,61%,62%)",
    bottom: "clamp(550px, 38vw, 640px)",
  },
  waffle: {
    w: "clamp(1000px, 72vw, 1200px)",
    left: "calc(64% + var(--waffleShift))",
    bottom: "0%",
  },
  tri: {
    w: "clamp(400px, 27vw, 490px)",
    left: "calc(23% - var(--triShift))",
    bottom: "0%",
  },
  green: { w: "clamp(210px, 16vw, 270px)", left: "86%", bottom: "0%" },
} as const;

type HeroName = keyof typeof HERO_LAYOUT;

const HeroItem = styled.div<{ $name: HeroName; $delay: number; $rot: number }>`
  position: absolute;
  width: ${({ $name }) => HERO_LAYOUT[$name].w};

  left: ${({ $name }) => HERO_LAYOUT[$name].left};
  bottom: ${({ $name }) => HERO_LAYOUT[$name].bottom};

  --rot: ${({ $rot }) => $rot};

  transform-origin: center center;
  opacity: 0;

  animation: ${dropToFloor} 1.05s cubic-bezier(0.2, 0.85, 0.25, 1)
    ${({ $delay }) => $delay}s forwards;

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
`;

/* title */
const heroTitleDropIn = keyframes`
  0% { transform: translateY(-200%); opacity: 0; }
  70% { transform: translateY(8%); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
`;

const HeroTitleWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 35px;
  z-index: 60;
  display: flex;
  align-items: flex-start;

  transform: translateY(-200%);
  opacity: 0;
  animation: ${heroTitleDropIn} 1s cubic-bezier(0.23, 1, 0.32, 1) 1.5s forwards;

  will-change: transform, opacity;
`;

const HeroTitle = styled.div`
  display: inline-flex;
  background: #121212;
  padding: 16px 16px 0px;
  line-height: 1.05;

  gap: 0.25em;

  color: ${({ theme }) => theme.colors.black[100]};
  font-family: "GMarket Sans";
  font-size: 12rem;
  font-weight: 400;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
  }
`;

const HeroTitleArrowButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin-left: 0;
  cursor: pointer;
  display: flex;
  align-items: stretch;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.black[80]};
    outline-offset: 4px;
  }
`;

const HeroTitleArrow = styled.img`
  height: 14rem;
  width: auto;
  display: block;
`;

/* confetti */
const confettiFall = keyframes`
  0% { top: -${CONFETTI_SIZE + 12}px; opacity: 0; }
  15% { opacity: 1; }
  100% { top: calc(100svh - ${CONFETTI_SIZE}px); opacity: 1; }
`;

const ConfettiLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  mix-blend-mode: difference;
  isolation: isolate;
`;

const ConfettiPiece = styled.div<{ leftPercent: number }>`
  position: absolute;
  width: ${CONFETTI_SIZE}px;
  height: ${CONFETTI_SIZE}px;
  top: -${CONFETTI_SIZE + 12}px;
  left: ${({ leftPercent }) =>
    `calc(${leftPercent}% - ${CONFETTI_SIZE / 2}px)`};
  background-color: #fff;
  opacity: 0.95;

  animation-name: ${confettiFall};
  animation-timing-function: cubic-bezier(0.27, 0.03, 0.17, 1);
  animation-duration: 2.6s;
  animation-fill-mode: forwards;

  will-change: top;
  pointer-events: none;
`;
