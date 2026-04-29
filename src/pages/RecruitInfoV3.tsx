import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
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

  const [hashScrollPending, setHashScrollPending] = useState(false);
  const isFetching = useIsFetching();

  useEffect(() => {
    if (location.hash) {
      setHashScrollPending(true);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (!hashScrollPending || isFetching > 0) return;

    const element = document.querySelector(location.hash);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 40;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setHashScrollPending(false);
  }, [hashScrollPending, isFetching, location.hash]);

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
