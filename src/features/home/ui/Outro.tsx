import styled from "styled-components";
import { RecruitingCTAButton } from "../../../shared/ui/button/RecruitingCTAButton";

export const Outro = () => {
  return (
    <Section>
      <ContentWrapper>
        <TextWrapper>
          <Title>같이 만들고, 같이 배웁니다.</Title>
          <Description>
            와플스튜디오는 서울대 개발자들이 함께 모여 웹/앱 서비스를 만들고,
            기술을 나누며 함께 성장하는 공간입니다.
            <br />
            함께 세미나, 프로젝트, 스터디를 통해 실력을 쌓고 멋진 서비스를 함께
            만들어봐요!
          </Description>
        </TextWrapper>
        <RecruitingCTAButton />
      </ContentWrapper>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background-color: #37007f;
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  text-align: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.colors.white};
`;

const Description = styled.div`
  gap: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
`;
