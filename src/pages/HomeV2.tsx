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
  return (
    <div>
      <MainContainer>
        <Headerv2 />
        <HeroSection />
        <WaffleHistory />
        <Activities />
        <TimeLine />
        <Projects />
        <Outro />
        <Footer />
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
