import styled from "styled-components";

export default function Banner() {
  return (
    <Section>
      <BackGround></BackGround>
      <ForeGround>
        <BannerText>
          와플스튜디오 <br /> <span>리쿠르팅</span> 시작합니다!
        </BannerText>
        <FlipClock></FlipClock>
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
  gap: 60px;
`;

const BannerText = styled.h1`
  color: #fff;
  font-family: Jalnan;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;

  -webkit-text-stroke: 1px #292929;
  text-shadow: -2px 0px #292929, 2px 0px #292929, 0px 2px #292929,
    0px -2px #292929;

  span {
    color: #f0745f;
    font-family: Jalnan;
    font-size: 84px;
  }
`;

const FlipClock = styled.div`
  width: 860px;
  height: 150px;
  background-color: #f0745f;
`;
