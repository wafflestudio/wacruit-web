import styled from "styled-components";
import { RecruitingCTAButton } from "../../shared/ui/button/RecruitingCTAButton";

// SVG imports
import cubDesktop from "../../components/icons/recruiting/Hero/CupDesktop.svg";
import mixerDesktop from "../../components/icons/recruiting/Hero/MixerDesktop.svg";
import bowlDesktop from "../../components/icons/recruiting/Hero/BowlDesktop.svg";
import cubMobile from "../../components/icons/recruiting/Hero/CubMobile.svg";
import mixerMobile from "../../components/icons/recruiting/Hero/MixerMobile.svg";
import bowlMobile from "../../components/icons/recruiting/Hero/BowlMobile.svg";

export const Hero = () => {
  return (
    <HeroContainer>
      <HeroBackgroundIcon>
        <MixerContainerDesktop>
          <img src={mixerDesktop} alt="" />
        </MixerContainerDesktop>
        <BowlContainerDesktop>
          <img src={bowlDesktop} alt="" />
        </BowlContainerDesktop>
        <CubContainerDesktop>
          <img src={cubDesktop} alt="" />
        </CubContainerDesktop>

        <MixerContainerMobile>
          <img src={mixerMobile} alt="" />
        </MixerContainerMobile>
        <BowlContainerMobile>
          <img src={bowlMobile} alt="" />
        </BowlContainerMobile>
        <CubContainerMobile>
          <img src={cubMobile} alt="" />
        </CubContainerMobile>
      </HeroBackgroundIcon>

      <HeroContent>
        <HeroHeader>
          <HeroTitle>함께 만들고 성장할 개발자를 찾습니다.</HeroTitle>
          <HeroSubtitle>
            서울대학교 최대 규모의 개발 동아리, 와플스튜디오에서 신규 회원을
            모집합니다.
            <br />
            세미나와 프로젝트를 통해 실력있는 개발자로 성장해보세요.
          </HeroSubtitle>
        </HeroHeader>
        <HeroCTAWrapper>
          <RecruitingCTAButton />
        </HeroCTAWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.brown};
  position: relative;
  overflow: hidden;
`;

const HeroBackgroundIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// Desktop Icons
const CubContainerDesktop = styled.div`
  position: absolute;
  left: 7.4vw; // 142.002 / 1920
  bottom: 0; // -25.001 / 1920
  width: 30vw; // 575.927 / 1920

  @media (max-width: 768px) {
    display: none;
  }
`;

const MixerContainerDesktop = styled.div`
  position: absolute;
  left: 7.14vw; // 137 / 1920
  top: -16.46vw; // -316 / 1920
  width: 58.94vw; // 1131.584 / 1920

  @media (max-width: 768px) {
    display: none;
  }
`;

const BowlContainerDesktop = styled.div`
  position: absolute;
  right: -7.24vw; // -139.082 / 1920
  bottom: -1vw; // -19.2 / 1920
  width: 89.43vw; // 1717.08 / 1920

  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile Icons
const CubContainerMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: clamp(200px, 70vw, 400px);
  }
`;

// 모바일 - 거품기(Mixer)
const MixerContainerMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 0px;
    top: 40px;
    width: clamp(350px, 100vw, 540px);
    height: auto;
  }
`;

// 모바일 - 믹싱볼(Bowl)
const BowlContainerMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    left: 0px;
    bottom: -0.244px;
    width: clamp(300px, 100vw, 766px);
    height: auto;
  }
`;

const HeroContent = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex: 1 0 0;
  box-sizing: border-box;
  justify-content: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 30px;
  }
`;

const HeroHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: "Pretendard Variable", sans-serif;
  font-size: clamp(4rem, 2.604vw, 5rem); // 40px ~ 50px (1920px 기준)
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.01em;
  margin: 0;
  align-self: stretch;

  @media (max-width: 768px) {
    letter-spacing: -0.32px;
  }

  @media (max-width: 480px) {
    letter-spacing: -0.24px;
  }
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.18px;
  margin: 0;
  align-self: stretch;

  @media (max-width: 768px) {
    letter-spacing: -0.16px;
  }
`;

const HeroCTAWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
