import styled from "styled-components";
import { RecruitingCTAButton } from "../../../shared/ui/button/RecruitingCTAButton";

export const Outro = () => {
  return (
    <Section>
      <ContentWrapper>
        <Title>같이 만들고, 같이 배웁니다.</Title>
        <Description>
          <p>
            와플스튜디오는 서울대 개발자들이 함께 모여 웹/앱 서비스를 만들고,
            기술을 나누며 함께 성장하는 공간입니다.
          </p>
          <p>
            함께 세미나, 프로젝트, 스터디를 통해 실력을 쌓고 멋진 서비스를 함께
            만들어봐요!
          </p>
        </Description>
        <RecruitingCTAButton />
      </ContentWrapper>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: #222;
`;

const Description = styled.div`
  font-size: 1.6rem;
  line-height: 1.8;
  color: #555;

  p + p {
    margin-top: 1rem;
  }
`;
