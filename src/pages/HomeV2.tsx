import { useCallback, useEffect, useRef } from "react";
import { useNavigationType } from "react-router-dom";
import Headerv2 from "../shared/ui/header/HeaderV2";
import styled from "styled-components";
import { HeroSection } from "../features/home/ui/HeroSection";
import { WaffleHistory } from "../features/home/ui/WaffleHistory";
import { Activities } from "../features/home/ui/Activities";
import { Projects } from "../features/home/ui/Projects";
import { Outro } from "../features/home/ui/Outro";
import { TimeLine } from "../features/home/ui/Timeline";
import Footer from "../shared/ui/footer/Footer";

export default function HomeV2() {
  const navigationType = useNavigationType();
  const waffleHistoryRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToHistory = useCallback(() => {
    waffleHistoryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [navigationType]);

  return (
    <div>
      <MainContainer>
        <Headerv2 />
        <HeroSection onScrollToHistory={handleScrollToHistory} />
        <ScrollTarget ref={waffleHistoryRef}>
          <WaffleHistory />
        </ScrollTarget>
        <Activities />
        <TimeLine />
        <Projects />
        <Outro />
        <Footer />
      </MainContainer>
    </div>
  );
}

const ScrollTarget = styled.div`
  scroll-margin-top: 47px;
`;

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
