import styled from "styled-components";
import { Hero } from "../features/recruiting/ui/Hero";
import { Requirement } from "../features/recruiting/ui/Requirement";
import { Positions } from "../features/recruiting/ui/Position";
import { Timeline } from "../features/recruiting/ui/Timeline";
import { RookieInfo } from "../features/recruiting/ui/RookieInfo";
import { Faq } from "../features/recruiting/ui/Faq";
import Headerv2 from "../shared/ui/header/HeaderV2";

const RecruitInfoV2 = () => {
  return (
    <MainContainer>
      <Headerv2 />
      <Hero />
      <Requirement />
      <Positions />
      <Timeline />
      <RookieInfo />
      <Faq />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  min-width: 92rem;
`;

export default RecruitInfoV2;
