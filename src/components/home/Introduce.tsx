import styled from "styled-components";

export default function Introduce() {
  return (
    <Section>
      <IntroduceTop>
        <h1>
          와플스튜디오에서 <span>&lsquo;22.5기 신입회원&rsquo;</span> 을
          모집합니다!
        </h1>
        <p>
          와플스튜디오는 개발자들의 커뮤니티를 형성하고, 다양한 프로젝트와
          서비스들의 기획과 개발을 지원하고 있습니다.
          <br /> 현재 SNUTT, 식샤, 스누보드 등의 서비스를 개발한 와플스튜디오의
          개발자들과 함께하실 차기 개발자/디자이너분들을 환영합니다!
        </p>
      </IntroduceTop>
      <IntroduceBottom>
        <BottomLine>
          <div>지원기간</div>
          <div>2024.08.10(금) ~ 08.18(일) 23:59</div>
        </BottomLine>
        <BottomLine>
          <div>지원분야</div>
          <div>
            <div>루키(Rookie) & 디자이너(Designer)</div>
          </div>
        </BottomLine>
      </IntroduceBottom>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0745f;
  gap: 5rem;
`;

const IntroduceTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  text-align: center;
  h1 {
    color: #fff;
    font-family: Jalnan;
    font-size: 2.4rem;
    font-weight: 700;

    span {
      color: #fff;
      font-family: Jalnan;
      font-size: 3.2rem;
      -webkit-text-stroke: 0.2rem #8b3c2e;
      font-weight: 700;
      text-shadow: calc(0.05rem * 1) 0 0 #8b3c2e,
        calc(0.05rem * 0.9239) calc(0.05rem * 0.3827) 0 #8b3c2e,
        calc(0.05rem * 0.7071) calc(0.05rem * 0.7071) 0 #8b3c2e,
        calc(0.05rem * 0.3827) calc(0.05rem * 0.9239) 0 #8b3c2e,
        0 calc(0.05rem * 1) 0 #8b3c2e,
        calc(0.05rem * -0.3827) calc(0.05rem * 0.9239) 0 #8b3c2e,
        calc(0.05rem * -0.7071) calc(0.05rem * 0.7071) 0 #8b3c2e,
        calc(0.05rem * -0.9239) calc(0.05rem * 0.3827) 0 #8b3c2e,
        calc(0.05rem * -1) 0 0 #8b3c2e,
        calc(0.05rem * -0.9239) calc(0.05rem * -0.3827) 0 #8b3c2e,
        calc(0.05rem * -0.7071) calc(0.05rem * -0.7071) 0 #8b3c2e,
        calc(0.05rem * -0.3827) calc(0.05rem * -0.9239) 0 #8b3c2e,
        0 calc(0.05rem * -1) 0 #8b3c2e,
        calc(0.05rem * 0.3827) calc(0.05rem * -0.9239) 0 #8b3c2e,
        calc(0.05rem * 0.7071) calc(0.05rem * -0.7071) 0 #8b3c2e,
        calc(0.05rem * 0.9239) calc(0.05rem * -0.3827) 0 #8b3c2e;
    }
  }
  p {
    color: #fff8f6;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0.064rem;
  }
`;

const IntroduceBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

const BottomLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  & > div:nth-child(1) {
    padding: 0.4rem 1.5rem;
    border-radius: 1.15rem;
    border: 0.1rem solid #8b3c2e;
    background: #fff;

    color: #df6d59;
    font-size: 1.6rem;
    font-weight: 600;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 180%;

    & > p {
      color: #fff6f6;
      font-family: Pretendard;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 180%;
    }
  }

  & > p {
    color: #fff6f6;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 180%;
  }
`;
