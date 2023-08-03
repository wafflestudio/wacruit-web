import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./common";

export default function Service() {
  return (
    <Section>
      <SectionNumber>#3</SectionNumber>
      <SectionTitle>
        <h1>
          와플스튜디오 <span>출시 서비스</span>
        </h1>
        <p>와플스튜디오의 프로젝트로 시작해 실제 사용되고 있는 서비스</p>
      </SectionTitle>
      <Container>
        <App>
          <img src="/image/home/service/Snutt.png" />
          <h3>SNUTT</h3>
          <div>서울대학교 시간표 어플</div>
        </App>
        <App>
          <img src="/image/home/service/Siksha.png" id="siksha" />
          <h3>식샤</h3>
          <div>서울대학교 학식 어플</div>
        </App>
        <App>
          <img src="/image/home/service/Snuboard.png" />
          <h3>스누보드</h3>
          <div>서울대학교 과별 알림 어플</div>
        </App>
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

const Container = styled.div`
  display: flex;
  gap: 60px;
  padding-bottom: 60px;
`;

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  letter-spacing: -0.2px;

  img {
    width: 210px;
    height: 210px;
    object-fit: cover;
  }
  #siksha {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin: 45px 0;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
  }
`;
