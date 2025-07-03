import Headerv2 from "../components/home/Header/HeaderV2";
import styled from "styled-components";
import { HeroSection } from "../features/home/ui/HeroSection";
import { WaffleHistory } from "../features/home/ui/WaffleHistory";

export default function HomeV2() {
  return (
    <div>
      <Headerv2 />
      <MainContainer>
        <HeroSection />
        <WaffleHistory />
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  min-width: "92.0rem";
`;
