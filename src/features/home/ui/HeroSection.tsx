import styled from "styled-components";
import { RecruitingCTAButton } from "../../../shared/ui/header/RecruitingCTAButton";

export const HeroSection = () => {
  return (
    <Container>
      <TextGroup>
        <h3>맛있는 서비스가 탄생하는 곳</h3>
        <h1>와플스튜디오</h1>
      </TextGroup>
      <RecruitingCTAButton />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffefba, #ffffff);
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    font-size: 2.4rem;
    color: #555;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 5.6rem;
    font-weight: bold;
    color: #222;
  }
`;
