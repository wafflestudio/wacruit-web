import Headerv2 from "../components/home/Header/HeaderV2";
import styled from "styled-components";
import { HeroSection } from "../features/home/ui/HeroSection";

export default function HomeV2() {
  return (
    <div>
      <Headerv2 />
      <MainContainer>
        <HeroSection />
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  min-width: "92.0rem";
`;
