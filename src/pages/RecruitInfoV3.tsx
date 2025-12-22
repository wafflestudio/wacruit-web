import styled from "styled-components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../features/recruiting/Hero";
import { Requirement } from "../features/recruiting/Requirement";
import { Position } from "../features/recruiting/Position";
import { Timeline } from "../features/recruiting/Timeline";
import { RookieInfo } from "../features/recruiting/RookieInfo";
import { Faq } from "../features/recruiting/Faq";
import Headerv2 from "../shared/ui/header/HeaderV2";
import Footer from "../shared/ui/footer/Footer";

const RecruitInfoV3 = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 40;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
  flex-direction: column;
`;

export default RecruitInfoV3;
