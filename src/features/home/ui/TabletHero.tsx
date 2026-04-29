import styled, { keyframes } from "styled-components";
import { useMemo } from "react";

import HalfRoundSVG from "../../../components/icons/home/hero/HalfRoundTablet.svg?react";
import MixerSVG from "../../../components/icons/home/hero/MixerTablet.svg?react";
import RoundGreenSVG from "../../../components/icons/home/hero/RoundGreenTablet.svg?react";
import RoundPinkSVG from "../../../components/icons/home/hero/RoundPinkTablet.svg?react";
import TriangleSVG from "../../../components/icons/home/hero/TriangleTablet.svg?react";
import WaffleSVG from "../../../components/icons/home/hero/WaffleTablet.svg?react";
import ArrowDownSVG from "../../../components/icons/home/hero/ArrowDown.svg";

const CONFETTI_COUNT = 20;
const CONFETTI_SIZE = 19.8;

type ConfettiPieceData = {
  id: number;
  leftPercent: number;
  delay: number;
  duration: number;
  rotation: number;
};

type TabletHeroProps = {
  onScrollToHistory?: () => void;
};

export const TabletHero = ({ onScrollToHistory }: TabletHeroProps) => {
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
      <Scene>
        <HeroBackgroundIcon>
          <HeroItem $name="half" $delay={0.58} $rot={-10}>
            <HalfRoundSVG />
          </HeroItem>

          <HeroItem $name="mixer" $delay={0.43} $rot={14}>
            <MixerSVG />
          </HeroItem>

          <HeroItem $name="pink" $delay={0.62} $rot={-6}>
            <RoundPinkSVG />
          </HeroItem>

          <HeroItem $name="waffle" $delay={0.42} $rot={-8}>
            <WaffleSVG />
          </HeroItem>

          <HeroItem $name="tri" $delay={0.36} $rot={10}>
            <TriangleSVG />
          </HeroItem>

          <HeroItem $name="green" $delay={0.33} $rot={7}>
            <RoundGreenSVG />
          </HeroItem>
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
      </Scene>
    </Container>
  );
};

/* ================= animations ================= */
const dropToFloor = keyframes`
  0% {
    transform: translate3d(0, -80vh, 0) rotate(calc(var(--rot) * 1deg));
    opacity: 0;
    filter: blur(2px);
  }
  60% {
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 1;
  }
`;

const heroTitleDropIn = keyframes`
  0% { transform: translateY(-200%); opacity: 0; }
  70% { transform: translateY(8%); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
`;

const confettiFall = keyframes`
  0% { top: -${CONFETTI_SIZE + 12}px; opacity: 0; }
  15% { opacity: 1; }
  100% { top: calc(100vh - ${CONFETTI_SIZE}px); opacity: 1; }
`;

/* ================= styled ================= */
const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #dfffa3;
  display: flex;
  justify-content: center;
  align-items: stretch;
  position: relative;
  overflow: hidden;
`;

const Scene = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const HeroBackgroundIcon = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const HERO_LAYOUT = {
  half: {
    w: "clamp(160px, 20vw, 200px)",
    left: "3%",
    bottom: "clamp(480px, 46vh, 650px)",
  },
  mixer: {
    w: "clamp(420px, 55vw, 520px)",
    left: "-1%",
    bottom: "clamp(180px, 25.5vh, 380px)",
  },
  pink: {
    w: "clamp(140px, 25vw, 220px)",
    left: "11%",
    bottom: "clamp(650px, 62vh, 850px)",
  },
  waffle: {
    w: "clamp(650px, 88vw, 900px)",
    left: "clamp(120px, 8%, 210px)",
    bottom: "clamp(5px, 2vh, 15px)",
  },
  tri: { w: "clamp(360px, 41vw, 420px)", left: "-1%", bottom: "0%" },
  green: { w: "clamp(140px, 21vw, 220px)", left: "78%", bottom: "0%" },
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
    transform: translate3d(0, 0, 0);
    filter: none;
  }
`;

/* Title */
const HeroTitleWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 35px;
  z-index: 50;

  display: inline-flex;
  align-items: flex-start;

  width: fit-content;
  max-width: calc(100vw - 70px);

  transform: translateY(-200%);
  opacity: 0;
  animation: ${heroTitleDropIn} 1s cubic-bezier(0.23, 1, 0.32, 1) 1.3s forwards;
`;

const HeroTitle = styled.div`
  display: inline-flex;
  background: #121212;
  padding: 14px 14px 0px;
  line-height: 1.05;

  width: fit-content;
  gap: 0.25em;

  color: ${({ theme }) => theme.colors.black[100]};
  font-family: "Gmarket Sans";
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
  align-items: center;
`;

const HeroTitleArrow = styled.img`
  flex: 0 0 auto;
  display: block;

  height: 14rem;
  width: auto;

  margin-top: 0.15em;
`;

/* Confetti */
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
