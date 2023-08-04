import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./common";
import { useState } from "react";

export default function Service() {
  const [appIndex, setAppIndex] = useState(0);
  return (
    <Section>
      <SectionNumber>#3</SectionNumber>
      <SectionTitle>
        <h1>
          와플스튜디오 <span>출시 서비스</span>
        </h1>
        <p>와플스튜디오의 프로젝트로 시작해 실제 사용되고 있는 서비스</p>
      </SectionTitle>
      <Container $appIndex={appIndex}>
        <LeftButton
          disabled={appIndex === 0}
          onClick={() => setAppIndex((v) => v - 1)}
        />
        <App>
          <img src="/image/home/service/Snutt.png" />
          <h3>SNUTT</h3>
          <div>서울대학교 시간표 어플</div>
          <div>
            <img src="/image/home/service/Snutt2.svg" />
          </div>
        </App>
        <App>
          <img src="/image/home/service/Siksha.png" id="siksha" />
          <h3>식샤</h3>
          <div>서울대학교 학식 어플</div>
          <div>
            <img src="/image/home/service/Siksha2.png" id="siksha2" />
          </div>
        </App>
        <App>
          <img src="/image/home/service/Snuboard.png" />
          <h3>스누보드</h3>
          <div>서울대학교 과별 알림 어플</div>
          <div>
            <img src="/image/home/service/Snuboard2.svg" />
          </div>
        </App>
        <RightButton
          disabled={appIndex === 2}
          onClick={() => setAppIndex((v) => v + 1)}
        />
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{ $appIndex: number }>`
  display: flex;
  gap: 60px;
  padding-bottom: 60px;
  align-items: center;

  > :nth-child(${(props) => props.$appIndex + 2}) {
    display: grid;
  }
`;

const App = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  letter-spacing: -0.2px;

  grid-template-areas:
    "x1 mobile"
    "logo mobile"
    "name mobile"
    "desc mobile"
    "x2 mobile";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr auto auto auto 1fr;
  grid-column-gap: 20px;
  justify-items: center;

  > img {
    width: 210px;
    height: 210px;
    object-fit: cover;
    grid-area: logo;
    border-radius: 26px;
  }
  #siksha {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin: 25px 0;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    grid-area: name;
  }
  div:nth-child(3) {
    grid-area: desc;
    color: #737373;
  }
  > div:last-child {
    grid-area: mobile;
    width: 306px;
    height: 582px;
    background: url("/image/mobileFrame.svg") no-repeat;
    background-size: 306px 582px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 306px;
      height: 582px;
      border-radius: 26px;
    }
    #siksha2 {
      width: 282px;
      height: 556px;
    }
  }
`;

const LeftButton = styled.button`
  width: 22px;
  height: 39px;
  background: url("${(props) =>
      props.disabled ? "/icon/LeftLightOrange.svg" : "/icon/RightOrange.svg"}")
    no-repeat;
  ${(props) => !props.disabled && { transform: "rotate(180deg)" }}
  background-size: 22px 39px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const RightButton = styled.button`
  width: 22px;
  height: 39px;
  background: url("${(props) =>
      props.disabled ? "/icon/LeftLightOrange.svg" : "/icon/RightOrange.svg"}")
    no-repeat;
  ${(props) => props.disabled && { transform: "rotate(180deg)" }}
  background-size: 22px 39px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
