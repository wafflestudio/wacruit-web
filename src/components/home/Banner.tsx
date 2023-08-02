import styled from "styled-components";
import Countdown from "./Countdown";

export default function Banner() {
  return (
    <Section>
      <BackGround></BackGround>
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
            와플스튜디오 <br /> <span>리쿠르팅</span> 시작합니다!
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

const BackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fffbf3;
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
