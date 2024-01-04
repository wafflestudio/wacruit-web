import styled, { keyframes } from "styled-components";
import Countdown from "./Countdown";

export default function Banner() {
  return (
    <Section>
      <BackGround>
        <img src="/image/home/banner/WaffleFilled.svg" id="waffle1" />
        <img src="/image/home/banner/WaffleEmpty.svg" id="waffle2" />
        <img src="/image/home/banner/WaffleEmpty.svg" id="waffle3" />
        <img src="/image/home/banner/WaffleFilled.svg" id="waffle4" />
        <img src="/image/home/banner/WaffleFilled.svg" id="waffle5" />
        <img src="/image/home/banner/WaffleEmpty.svg" id="waffle6" />
        <img src="/image/home/banner/WaffleEmpty.svg" id="waffle7" />
      </BackGround>
      <ForeGround>
        <BannerText>
          <img
            style={{ position: "absolute", right: "-7.0rem", top: "-2.0rem" }}
            src="/image/home/banner/ReadingGlass.svg"
            alt="Glass"
          />
          <img
            style={{ position: "absolute", left: "4.8rem", bottom: "10.0rem" }}
            src="/image/home/banner/Eyes.svg"
            alt="Eyes"
          />
          <img
            style={{ position: "absolute", left: "-15.0rem", bottom: "6.0rem" }}
            src="/image/home/banner/MousePointer.svg"
            alt="Mouse"
          />
          <img
            style={{ position: "absolute", left: "2.8rem", bottom: "17.0rem" }}
            src="/image/home/stars/Star20.svg"
            alt="Star"
          />
          <img
            style={{ position: "absolute", left: "-0.8rem", bottom: "18.5rem" }}
            src="/image/home/stars/Star30.svg"
            alt="Star"
          />
          <img
            style={{ position: "absolute", right: "-7.0rem", top: "-6.0rem" }}
            src="/image/home/stars/Star40.svg"
            alt="Star"
          />
          <h1 style={{ zIndex: "1" }}>
            와플스튜디오 <br /> <span>리크루팅</span> 시작합니다!
          </h1>
        </BannerText>
        <FlipClockContainer>
          <Countdown />
        </FlipClockContainer>
      </ForeGround>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 98rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ForeGround = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rem;
`;

const BannerText = styled.div`
  display: flex;
  position: relative;

  h1 {
    color: #fff;
    font-family: Jalnan;
    font-size: 6.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
    text-shadow: calc(0.5rem * 1) 0 0 #292929,
      calc(0.5rem * 0.9239) calc(0.5rem * 0.3827) 0 #292929,
      calc(0.5rem * 0.7071) calc(0.5rem * 0.7071) 0 #292929,
      calc(0.5rem * 0.3827) calc(0.5rem * 0.9239) 0 #292929,
      0 calc(0.5rem * 1) 0 #292929,
      calc(0.5rem * -0.3827) calc(0.5rem * 0.9239) 0 #292929,
      calc(0.5rem * -0.7071) calc(0.5rem * 0.7071) 0 #292929,
      calc(0.5rem * -0.9239) calc(0.5rem * 0.3827) 0 #292929,
      calc(0.5rem * -1) 0 0 #292929,
      calc(0.5rem * -0.9239) calc(0.5rem * -0.3827) 0 #292929,
      calc(0.5rem * -0.7071) calc(0.5rem * -0.7071) 0 #292929,
      calc(0.5rem * -0.3827) calc(0.5rem * -0.9239) 0 #292929,
      0 calc(0.5rem * -1) 0 #292929,
      calc(0.5rem * 0.3827) calc(0.5rem * -0.9239) 0 #292929,
      calc(0.5rem * 0.7071) calc(0.5rem * -0.7071) 0 #292929,
      calc(0.5rem * 0.9239) calc(0.5rem * -0.3827) 0 #292929,
      //
      calc(0.5rem * 1 + 1.2rem) -0.7rem 0 #292929,
      calc(0.5rem * 0.9239 + 1.2rem) calc(0.5rem * 0.3827 - 0.7rem) 0 #292929,
      calc(0.5rem * 0.7071 + 1.2rem) calc(0.5rem * 0.7071 - 0.7rem) 0 #292929,
      calc(0.5rem * 0.3827 + 1.2rem) calc(0.5rem * 0.9239 - 0.7rem) 0 #292929,
      1.2rem calc(0.5rem * 1 - 0.7rem) 0 #292929,
      calc(0.5rem * -0.3827 + 1.2rem) calc(0.5rem * 0.9239 - 0.7rem) 0 #292929,
      calc(0.5rem * -0.7071 + 1.2rem) calc(0.5rem * 0.7071 - 0.7rem) 0 #292929,
      calc(0.5rem * -0.9239 + 1.2rem) calc(0.5rem * 0.3827 - 0.7rem) 0 #292929,
      calc(0.5rem * -1 + 1.2rem) -0.7rem 0 #292929,
      calc(0.5rem * -0.9239 + 1.2rem) calc(0.5rem * -0.3827 - 0.7rem) 0 #292929,
      calc(0.5rem * -0.7071 + 1.2rem) calc(0.5rem * -0.7071 - 0.7rem) 0 #292929,
      calc(0.5rem * -0.3827 + 1.2rem) calc(0.5rem * -0.9239 - 0.7rem) 0 #292929,
      1.2rem calc(0.5rem * -1 - 0.7rem) 0 #292929,
      calc(0.5rem * 0.3827 + 1.2rem) calc(0.5rem * -0.9239 - 0.7rem) 0 #292929,
      calc(0.5rem * 0.7071 + 1.2rem) calc(0.5rem * -0.7071 - 0.7rem) 0 #292929,
      calc(0.5rem * 0.9239 + 1.2rem) calc(0.5rem * -0.3827 - 0.7rem) 0 #292929;

    span {
      color: #f0745f;
      font-family: Jalnan;
      font-size: 8.4rem;
      text-shadow: calc(0.5rem * 1) 0 0 #671f13,
        calc(0.5rem * 0.9239) calc(0.5rem * 0.3827) 0 #671f13,
        calc(0.5rem * 0.7071) calc(0.5rem * 0.7071) 0 #671f13,
        calc(0.5rem * 0.3827) calc(0.5rem * 0.9239) 0 #671f13,
        0 calc(0.5rem * 1) 0 #671f13,
        calc(0.5rem * -0.3827) calc(0.5rem * 0.9239) 0 #671f13,
        calc(0.5rem * -0.7071) calc(0.5rem * 0.7071) 0 #671f13,
        calc(0.5rem * -0.9239) calc(0.5rem * 0.3827) 0 #671f13,
        calc(0.5rem * -1) 0 0 #671f13,
        calc(0.5rem * -0.9239) calc(0.5rem * -0.3827) 0 #671f13,
        calc(0.5rem * -0.7071) calc(0.5rem * -0.7071) 0 #671f13,
        calc(0.5rem * -0.3827) calc(0.5rem * -0.9239) 0 #671f13,
        0 calc(0.5rem * -1) 0 #671f13,
        calc(0.5rem * 0.3827) calc(0.5rem * -0.9239) 0 #671f13,
        calc(0.5rem * 0.7071) calc(0.5rem * -0.7071) 0 #671f13,
        calc(0.5rem * 0.9239) calc(0.5rem * -0.3827) 0 #671f13,
        //
        calc(0.5rem * 1 + 1.2rem) -0.7rem 0 #671f13,
        calc(0.5rem * 0.9239 + 1.2rem) calc(0.5rem * 0.3827 - 0.7rem) 0 #671f13,
        calc(0.5rem * 0.7071 + 1.2rem) calc(0.5rem * 0.7071 - 0.7rem) 0 #671f13,
        calc(0.5rem * 0.3827 + 1.2rem) calc(0.5rem * 0.9239 - 0.7rem) 0 #671f13,
        1.2rem calc(0.5rem * 1 - 0.7rem) 0 #671f13,
        calc(0.5rem * -0.3827 + 1.2rem) calc(0.5rem * 0.9239 - 0.7rem) 0 #671f13,
        calc(0.5rem * -0.7071 + 1.2rem) calc(0.5rem * 0.7071 - 0.7rem) 0 #671f13,
        calc(0.5rem * -0.9239 + 1.2rem) calc(0.5rem * 0.3827 - 0.7rem) 0 #671f13,
        calc(0.5rem * -1 + 1.2rem) -0.7rem 0 #671f13,
        calc(0.5rem * -0.9239 + 1.2rem) calc(0.5rem * -0.3827 - 0.7rem) 0
          #671f13,
        calc(0.5rem * -0.7071 + 1.2rem) calc(0.5rem * -0.7071 - 0.7rem) 0
          #671f13,
        calc(0.5rem * -0.3827 + 1.2rem) calc(0.5rem * -0.9239 - 0.7rem) 0
          #671f13,
        1.2rem calc(0.5rem * -1 - 0.7rem) 0 #671f13,
        calc(0.5rem * 0.3827 + 1.2rem) calc(0.5rem * -0.9239 - 0.7rem) 0 #671f13,
        calc(0.5rem * 0.7071 + 1.2rem) calc(0.5rem * -0.7071 - 0.7rem) 0 #671f13,
        calc(0.5rem * 0.9239 + 1.2rem) calc(0.5rem * -0.3827 - 0.7rem) 0 #671f13;
    }
  }
`;

const FlipClockContainer = styled.div`
  width: 86rem;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const waffle1_1 = keyframes`
  0% {
    transform: scale(0.5) translate(30.0rem, 30.0rem) rotate(0);
    opacity: 0;
  }
  100%{
    transform: scale(0.75) translate(53.0rem, 70.0rem) rotate(30deg);
  }
`;

const waffle1_2 = keyframes`
  0% {
    transform: scale(0.75) translate(53.0rem, 70.0rem) rotate(30deg);
  }
  100%{
   transform: scale(0.9) translate(60.2rem, 46.0rem) rotate(63deg);
  }
`;

const waffle2_1 = keyframes`
  0% {
    transform: scale(0.5) translate(55.0rem, 28.0rem) rotate(-110deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.75) translate(63.0rem, 70.0rem) rotate(-100deg);
  }
`;

const waffle2_2 = keyframes`
  0% {
    transform: scale(0.75) translate(63.0rem, 70.0rem) rotate(-100deg);
  }
  100%{
   transform:  scale(0.9) translate(81.0rem, 51.0rem) rotate(-60deg);
  }
`;

const waffle3_1 = keyframes`
  0% {
    transform: scale(0.2) translate(20.0rem, 50.0rem) rotate(-80deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.6) translate(42.0rem, 90.0rem) rotate(-60deg);
  }
`;

const waffle3_2 = keyframes`
  0% {
    transform: scale(0.6) translate(42.0rem, 90.0rem) rotate(-60deg);
  }
  100%{
    transform: scale(0.75) translate(49.0rem, 62.0rem) rotate(-44.955deg);
  }
`;

const waffle4_1 = keyframes`
  0% {
    transform: scale(0.2) translate(100.0rem, 0.0rem) rotate(80deg);
    opacity: 0;
  }
  20%{
     transform: scale(0.2) translate(100.0rem, 0.0rem) rotate(80deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.5) translate(136.0rem, 34.0rem) rotate(133.046deg);
    opacity:1;
  }
`;

const waffle5_1 = keyframes`
  0% {
    transform: scale(0.3) translate(-60.0rem, 50.0rem) rotate(200deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.5) translate(-82.0rem, 100.0rem) rotate(185deg);
  }
`;

const waffle5_2 = keyframes`
  0% {
    transform: scale(0.5) translate(-82.0rem, 100.0rem) rotate(185deg);
  }
  100%{
    transform: scale(0.7) translate(-100.0rem, 53.0rem) rotate(145.744deg);
  }
`;

const waffle6_1 = keyframes`
  0% {
    transform: scale(0.7) translate(-30.0rem, 20.0rem) rotate(80deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.9) translate(-60.0rem, 50.0rem) rotate(60deg);
  }
`;
const waffle6_2 = keyframes`
  0% {
    transform: scale(0.9) translate(-60.0rem, 50.0rem) rotate(60deg);
  }
  100%{
    transform: scale(1.05) translate(-82.5rem, 35.5rem) rotate(34.223deg);
  }
`;

const waffle7_1 = keyframes`
  0% {
    transform: scale(0.3) translate(-50.0rem, 20.0rem) rotate(60deg);
    opacity: 0;
  }  
  20% {
    transform: scale(0.3) translate(-50.0rem, 20.0rem) rotate(60deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.5) translate(-100.0rem, 55.5rem) rotate(40.022deg);
  }
`;
const BackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fffbf3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  #waffle1 {
    position: absolute;
    transform: scale(0.9) translate(60.2rem, 46rem) rotate(63deg);
    animation: 0.8s ease-in ${waffle1_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle1_2};
  }
  #waffle2 {
    position: absolute;
    transform: scale(0.9) translate(81rem, 51rem) rotate(-60deg);
    animation: 0.8s ease-in ${waffle2_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle2_2};
  }
  #waffle3 {
    position: absolute;
    transform: scale(0.75) translate(49rem, 62rem) rotate(-44.955deg);
    animation: 0.8s ease-in ${waffle3_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle3_2};
  }
  #waffle4 {
    position: absolute;
    transform: scale(0.5) translate(136rem, 34rem) rotate(133.046deg);
    animation: 1.6s ease ${waffle4_1};
  }
  #waffle5 {
    position: absolute;
    transform: scale(0.7) translate(-100rem, 53rem) rotate(145.744deg);
    animation: 0.8s ease-in ${waffle5_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle5_2};
  }
  #waffle6 {
    position: absolute;
    transform: scale(1.05) translate(-82.5rem, 35.5rem) rotate(34.223deg);
    animation: 0.8s ease-in ${waffle6_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle6_2};
  }
  #waffle7 {
    position: absolute;
    transform: scale(0.5) translate(-100rem, 55.5rem) rotate(40.022deg);
    animation: 1.6s ease ${waffle7_1};
  }
`;
