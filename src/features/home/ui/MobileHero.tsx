import styled, { keyframes } from "styled-components";
import { useMemo } from "react";

import HalfRoundSVG from "../../../components/icons/home/hero/HalfRoundMobile.svg?react";
import MixerSVG from "../../../components/icons/home/hero/MixerMobile.svg?react";
import RoundGreenSVG from "../../../components/icons/home/hero/RoundGreenMobile.svg?react";
import RoundPinkSVG from "../../../components/icons/home/hero/RoundPinkMobile.svg?react";
import TriangleSVG from "../../../components/icons/home/hero/TriangleMobile.svg?react";
import WaffleSVG from "../../../components/icons/home/hero/WaffleMobile.svg?react";
import ArrowDownSVG from "../../../components/icons/home/hero/ArrowDown.svg";

const CONFETTI_COUNT = 20;
const CONFETTI_SIZE = 12.39;

type ConfettiPieceData = {
  id: number;
  leftPercent: number;
  delay: number;
  duration: number;
  rotation: number;
};

type MobileHeroProps = {
  onScrollToHistory?: () => void;
};

export const MobileHero = ({ onScrollToHistory }: MobileHeroProps) => {
  const confettiPieces = useMemo<ConfettiPieceData[]>(() => {
    return Array.from({ length: CONFETTI_COUNT }, (_, idx) => ({
      id: idx,
      leftPercent: 6 + Math.random() * 88,
      delay: 0.22 + Math.random() * 0.9,
      duration: 1.8 + Math.random() * 1.2,
      rotation: Math.random() * 90 - 45,
    }));
  }, []);

  return (
    <Container>
      <Scene>
        <HeroBackgroundIcon>
          <HeroItem $name="half" $delay={0.33} $rot={-8}>
            <HalfRoundSVG />
          </HeroItem>

          <HeroItem $name="mixer" $delay={0.44} $rot={10}>
            <MixerSVG />
          </HeroItem>

          <HeroItem $name="pink" $delay={0.5} $rot={-6}>
            <RoundPinkSVG />
          </HeroItem>

          <HeroItem $name="waffle" $delay={0.4} $rot={-8}>
            <WaffleSVG />
          </HeroItem>

          <HeroItem $name="tri" $delay={0.34} $rot={8}>
            <TriangleSVG />
          </HeroItem>

          <HeroItem $name="green" $delay={0.32} $rot={6}>
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
            Waffle
            <TitleBreak />
            Studio
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
    transform: translate3d(0, -70vh, 0) rotate(calc(var(--rot) * 1deg));
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
  0% { transform: translateY(-180%); opacity: 0; }
  70% { transform: translateY(6%); opacity: 1; }
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
  waffle: {
    w: "clamp(200px, 88vw, 400px)",
    left: "clamp(50px, 13%, 100px)",
    bottom: "13%",
  },
  tri: { w: "clamp(170px, 55vw, 270px)", left: "-2%", bottom: "0%" },
  green: { w: "clamp(110px, 22vw, 130px)", left: "58%", bottom: "1%" },

  mixer: {
    w: "clamp(140px, 40vw, 165px)",
    left: "2%",
    bottom: "clamp(380px, 50vh, 450px)",
  },
  half: {
    w: "clamp(100px, 28vw, 120px)",
    left: "clamp(280px, 69%, 340px)",
    bottom: "clamp(30px, 18%, 130px)",
  },
  pink: {
    w: "clamp(100px, 30vw, 150px)",
    left: "66%",
    bottom: "clamp(600px, 82vh, 780px)",
  },
} as const;

type HeroName = keyof typeof HERO_LAYOUT;

const HeroItem = styled.div<{ $name: HeroName; $delay: number; $rot: number }>`
  position: absolute;
  width: ${({ $name }) => HERO_LAYOUT[$name].w};

  left: ${({ $name }) => HERO_LAYOUT[$name].left};
  bottom: ${({ $name }) => HERO_LAYOUT[$name].bottom};

  transform: translateX(-50%);
  transform-origin: center center;

  --rot: ${({ $rot }) => $rot};
  opacity: 0;

  animation: ${dropToFloor} 0.95s cubic-bezier(0.2, 0.85, 0.25, 1)
    ${({ $delay }) => $delay}s forwards;

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: translateX(-50%);
    filter: none;
  }
`;

/* Title */
const HERO_TITLE_SCALE = "clamp(3.2rem, 21vw, 10rem)";
const HERO_TITLE_LINE_HEIGHT = 1.05;

const HeroTitleWrapper = styled.div`
  position: absolute;
  top: 65px;
  left: 18px;
  z-index: 50;

  display: inline-flex;
  align-items: flex-start;

  width: fit-content;

  transform: translateY(-180%);
  opacity: 0;
  animation: ${heroTitleDropIn} 0.9s cubic-bezier(0.23, 1, 0.32, 1) 1s forwards;
  will-change: transform, opacity;
`;

const HeroTitle = styled.div`
  display: inline-block;
  width: fit-content;
  background-color: #121212;
  padding: 10px 10px 2px;

  color: ${({ theme }) => theme.colors.black[100]};
  font-family: "Gmarket Sans";
  font-size: 6rem;
  font-weight: 400;
  line-height: ${HERO_TITLE_LINE_HEIGHT};

  white-space: normal;
`;

const TitleBreak = styled.br`
  display: block;
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
  width: auto;

  height: calc(${HERO_TITLE_SCALE} * ${HERO_TITLE_LINE_HEIGHT});
  margin-top: 0.12em;
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
  animation-duration: 2.2s;
  animation-fill-mode: forwards;

  will-change: top;
  pointer-events: none;
`;
