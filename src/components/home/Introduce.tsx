import styled from "styled-components";

export default function Introduce() {
  return (
    <Section>
      <IntroduceTop>
        <h1>
          와플스튜디오에서 <span>'21.5기 신입회원'</span> 을 모집합니다!
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
          <div>2023.08.04(금) ~ 08.13(일) 23:59</div>
        </BottomLine>
        <BottomLine>
          <div>지원분야</div>
          <div>루키(Rookie) & 디자이너(Designer)</div>
        </BottomLine>
        <BottomLine>
          <p>-개발자(Programmer) 모집 공지는 추후에 올라올 예정입니다-</p>
        </BottomLine>
      </IntroduceBottom>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0745f;
  gap: 50px;
`;

const IntroduceTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  text-align: center;
  h1 {
    color: #fff;
    font-family: Jalnan;
    font-size: 24px;
    font-weight: 700;

    span {
      color: #fff;
      font-family: Jalnan;
      font-size: 32px;
    }
  }
  p {
    color: #fff8f6;
    font-size: 16px;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0.64px;
  }
`;

const IntroduceBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const BottomLine = styled.div`
  display: flex;
  gap: 20px;

  & > div:nth-child(1) {
    padding: 3px 15px;
    border-radius: 11.5px;
    border: 1px solid #8b3c2e;
    background: #fff;

    color: #df6d59;
    font-size: 16px;
    font-weight: 600;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }

  & > p {
    color: #fff6f6;
    font-size: 16px;
    font-weight: 400;
    line-height: 180%;
  }
`;
