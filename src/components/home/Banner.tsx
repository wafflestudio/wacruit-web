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
            style={{ position: "absolute", right: "-70px", top: "-20px" }}
            src="/image/home/banner/ReadingGlass.svg"
            alt="Glass"
          />
          <img
            style={{ position: "absolute", left: "48px", bottom: "100px" }}
            src="/image/home/banner/Eyes.svg"
            alt="Eyes"
          />
          <img
            style={{ position: "absolute", left: "-150px", bottom: "60px" }}
            src="/image/home/banner/MousePointer.svg"
            alt="Mouse"
          />
          <img
            style={{ position: "absolute", left: "28px", bottom: "170px" }}
            src="/image/home/stars/Star20.svg"
            alt="Star"
          />
          <img
            style={{ position: "absolute", left: "-8px", bottom: "185px" }}
            src="/image/home/stars/Star30.svg"
            alt="Star"
          />
          <img
            style={{ position: "absolute", right: "-70px", top: "-60px" }}
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
  height: 980px;
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
  gap: 60px;
`;

const BannerText = styled.div`
  display: flex;
  position: relative;

  h1 {
    color: #fff;
    font-family: Jalnan;
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
    text-shadow: calc(5px * 1) 0 0 #292929,
      calc(5px * 0.9239) calc(5px * 0.3827) 0 #292929,
      calc(5px * 0.7071) calc(5px * 0.7071) 0 #292929,
      calc(5px * 0.3827) calc(5px * 0.9239) 0 #292929, 0 calc(5px * 1) 0 #292929,
      calc(5px * -0.3827) calc(5px * 0.9239) 0 #292929,
      calc(5px * -0.7071) calc(5px * 0.7071) 0 #292929,
      calc(5px * -0.9239) calc(5px * 0.3827) 0 #292929,
      calc(5px * -1) 0 0 #292929,
      calc(5px * -0.9239) calc(5px * -0.3827) 0 #292929,
      calc(5px * -0.7071) calc(5px * -0.7071) 0 #292929,
      calc(5px * -0.3827) calc(5px * -0.9239) 0 #292929,
      0 calc(5px * -1) 0 #292929,
      calc(5px * 0.3827) calc(5px * -0.9239) 0 #292929,
      calc(5px * 0.7071) calc(5px * -0.7071) 0 #292929,
      calc(5px * 0.9239) calc(5px * -0.3827) 0 #292929,
      //
      calc(5px * 1 + 12px) -7px 0 #292929,
      calc(5px * 0.9239 + 12px) calc(5px * 0.3827 - 7px) 0 #292929,
      calc(5px * 0.7071 + 12px) calc(5px * 0.7071 - 7px) 0 #292929,
      calc(5px * 0.3827 + 12px) calc(5px * 0.9239 - 7px) 0 #292929,
      12px calc(5px * 1 - 7px) 0 #292929,
      calc(5px * -0.3827 + 12px) calc(5px * 0.9239 - 7px) 0 #292929,
      calc(5px * -0.7071 + 12px) calc(5px * 0.7071 - 7px) 0 #292929,
      calc(5px * -0.9239 + 12px) calc(5px * 0.3827 - 7px) 0 #292929,
      calc(5px * -1 + 12px) -7px 0 #292929,
      calc(5px * -0.9239 + 12px) calc(5px * -0.3827 - 7px) 0 #292929,
      calc(5px * -0.7071 + 12px) calc(5px * -0.7071 - 7px) 0 #292929,
      calc(5px * -0.3827 + 12px) calc(5px * -0.9239 - 7px) 0 #292929,
      12px calc(5px * -1 - 7px) 0 #292929,
      calc(5px * 0.3827 + 12px) calc(5px * -0.9239 - 7px) 0 #292929,
      calc(5px * 0.7071 + 12px) calc(5px * -0.7071 - 7px) 0 #292929,
      calc(5px * 0.9239 + 12px) calc(5px * -0.3827 - 7px) 0 #292929;

    span {
      color: #f0745f;
      font-family: Jalnan;
      font-size: 84px;
      text-shadow: calc(5px * 1) 0 0 #671f13,
        calc(5px * 0.9239) calc(5px * 0.3827) 0 #671f13,
        calc(5px * 0.7071) calc(5px * 0.7071) 0 #671f13,
        calc(5px * 0.3827) calc(5px * 0.9239) 0 #671f13,
        0 calc(5px * 1) 0 #671f13,
        calc(5px * -0.3827) calc(5px * 0.9239) 0 #671f13,
        calc(5px * -0.7071) calc(5px * 0.7071) 0 #671f13,
        calc(5px * -0.9239) calc(5px * 0.3827) 0 #671f13,
        calc(5px * -1) 0 0 #671f13,
        calc(5px * -0.9239) calc(5px * -0.3827) 0 #671f13,
        calc(5px * -0.7071) calc(5px * -0.7071) 0 #671f13,
        calc(5px * -0.3827) calc(5px * -0.9239) 0 #671f13,
        0 calc(5px * -1) 0 #671f13,
        calc(5px * 0.3827) calc(5px * -0.9239) 0 #671f13,
        calc(5px * 0.7071) calc(5px * -0.7071) 0 #671f13,
        calc(5px * 0.9239) calc(5px * -0.3827) 0 #671f13,
        //
        calc(5px * 1 + 12px) -7px 0 #671f13,
        calc(5px * 0.9239 + 12px) calc(5px * 0.3827 - 7px) 0 #671f13,
        calc(5px * 0.7071 + 12px) calc(5px * 0.7071 - 7px) 0 #671f13,
        calc(5px * 0.3827 + 12px) calc(5px * 0.9239 - 7px) 0 #671f13,
        12px calc(5px * 1 - 7px) 0 #671f13,
        calc(5px * -0.3827 + 12px) calc(5px * 0.9239 - 7px) 0 #671f13,
        calc(5px * -0.7071 + 12px) calc(5px * 0.7071 - 7px) 0 #671f13,
        calc(5px * -0.9239 + 12px) calc(5px * 0.3827 - 7px) 0 #671f13,
        calc(5px * -1 + 12px) -7px 0 #671f13,
        calc(5px * -0.9239 + 12px) calc(5px * -0.3827 - 7px) 0 #671f13,
        calc(5px * -0.7071 + 12px) calc(5px * -0.7071 - 7px) 0 #671f13,
        calc(5px * -0.3827 + 12px) calc(5px * -0.9239 - 7px) 0 #671f13,
        12px calc(5px * -1 - 7px) 0 #671f13,
        calc(5px * 0.3827 + 12px) calc(5px * -0.9239 - 7px) 0 #671f13,
        calc(5px * 0.7071 + 12px) calc(5px * -0.7071 - 7px) 0 #671f13,
        calc(5px * 0.9239 + 12px) calc(5px * -0.3827 - 7px) 0 #671f13;
    }
  }
`;

const FlipClockContainer = styled.div`
  width: 860px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const waffle1_1 = keyframes`
  0% {
    transform: scale(0.5) translate(300px, 300px) rotate(0);
    opacity: 0;
  }
  100%{
    transform: scale(0.75) translate(530px, 700px) rotate(30deg);
  }
`;

const waffle1_2 = keyframes`
  0% {
    transform: scale(0.75) translate(530px, 700px) rotate(30deg);
  }
  100%{
   transform: scale(0.9) translate(602px, 460px) rotate(63deg);
  }
`;

const waffle2_1 = keyframes`
  0% {
    transform: scale(0.5) translate(550px, 280px) rotate(-110deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.75) translate(630px, 700px) rotate(-100deg);
  }
`;

const waffle2_2 = keyframes`
  0% {
    transform: scale(0.75) translate(630px, 700px) rotate(-100deg);
  }
  100%{
   transform:  scale(0.9) translate(810px, 510px) rotate(-60deg);
  }
`;

const waffle3_1 = keyframes`
  0% {
    transform: scale(0.2) translate(200px, 500px) rotate(-80deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.6) translate(420px, 900px) rotate(-60deg);
  }
`;

const waffle3_2 = keyframes`
  0% {
    transform: scale(0.6) translate(420px, 900px) rotate(-60deg);
  }
  100%{
    transform: scale(0.75) translate(490px, 620px) rotate(-44.955deg);
  }
`;

const waffle4_1 = keyframes`
  0% {
    transform: scale(0.2) translate(1000px, 00px) rotate(80deg);
    opacity: 0;
  }
  20%{
     transform: scale(0.2) translate(1000px, 00px) rotate(80deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.5) translate(1360px, 340px) rotate(133.046deg);
    opacity:1;
  }
`;

const waffle5_1 = keyframes`
  0% {
    transform: scale(0.3) translate(-600px, 500px) rotate(200deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.5) translate(-820px, 1000px) rotate(185deg);
  }
`;

const waffle5_2 = keyframes`
  0% {
    transform: scale(0.5) translate(-820px, 1000px) rotate(185deg);
  }
  100%{
    transform: scale(0.7) translate(-1000px, 530px) rotate(145.744deg);
  }
`;

const waffle6_1 = keyframes`
  0% {
    transform: scale(0.7) translate(-300px, 200px) rotate(80deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.9) translate(-600px, 500px) rotate(60deg);
  }
`;
const waffle6_2 = keyframes`
  0% {
    transform: scale(0.9) translate(-600px, 500px) rotate(60deg);
  }
  100%{
    transform: scale(1.05) translate(-825px, 355px) rotate(34.223deg);
  }
`;

const waffle7_1 = keyframes`
  0% {
    transform: scale(0.3) translate(-500px, 200px) rotate(60deg);
    opacity: 0;
  }  
  20% {
    transform: scale(0.3) translate(-500px, 200px) rotate(60deg);
    opacity: 0;
  }
  100%{
    transform: scale(0.5) translate(-1000px, 555px) rotate(40.022deg);
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
    transform: scale(0.9) translate(602px, 460px) rotate(63deg);
    animation: 0.8s ease-in ${waffle1_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle1_2};
  }
  #waffle2 {
    position: absolute;
    transform: scale(0.9) translate(810px, 510px) rotate(-60deg);
    animation: 0.8s ease-in ${waffle2_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle2_2};
  }
  #waffle3 {
    position: absolute;
    transform: scale(0.75) translate(490px, 620px) rotate(-44.955deg);
    animation: 0.8s ease-in ${waffle3_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle3_2};
  }
  #waffle4 {
    position: absolute;
    transform: scale(0.5) translate(1360px, 340px) rotate(133.046deg);
    animation: 1.6s ease ${waffle4_1};
  }
  #waffle5 {
    position: absolute;
    transform: scale(0.7) translate(-1000px, 530px) rotate(145.744deg);
    animation: 0.8s ease-in ${waffle5_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle5_2};
  }
  #waffle6 {
    position: absolute;
    transform: scale(1.05) translate(-825px, 355px) rotate(34.223deg);
    animation: 0.8s ease-in ${waffle6_1},
      0.6s cubic-bezier(0.04, 0.17, 0.47, 0.99) 0.8s ${waffle6_2};
  }
  #waffle7 {
    position: absolute;
    transform: scale(0.5) translate(-1000px, 555px) rotate(40.022deg);
    animation: 1.6s ease ${waffle7_1};
  }
`;
