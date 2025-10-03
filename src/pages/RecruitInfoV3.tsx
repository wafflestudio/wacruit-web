import styled from "styled-components";
import { Hero } from "../features/recruiting/Hero";
import { Requirement } from "../features/recruiting/Requirement";
import { Position } from "../features/recruiting/Position";
import { Timeline } from "../features/recruiting/Timeline";
import { RookieInfo } from "../features/recruiting/RookieInfo";
import { Faq } from "../features/recruiting/Faq";
import Headerv2 from "../shared/ui/header/HeaderV2";
import Footer from "../shared/ui/footer/Footer";

const RecruitInfoV3 = () => {
  return (
    <MainContainer>
      <Headerv2 />
      <Hero />
      <Requirement />
      <Position />
      <Timeline />
      <RookieInfo />
      <Faq />
      <Footer />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default RecruitInfoV3;
