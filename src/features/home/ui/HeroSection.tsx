import styled from "styled-components";

export const HeroSection = () => {
  // /recruiting/pre-registration
  const MOCK_PRE_REGISTRATION_URL = "https://docs.google.com/forms";

  return (
    <Container>
      <TextGroup>
        <h3>맛있는 서비스가 탄생하는 곳</h3>
        <h1>와플스튜디오</h1>
      </TextGroup>
      <ButtonGroup>
        <a href={MOCK_PRE_REGISTRATION_URL} target="_blank" rel="noreferrer">
          23.5기 모집 알림 신청하기
        </a>
      </ButtonGroup>
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

const ButtonGroup = styled.div`
  a {
    background-color: #ff6f61;
    color: white;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e55b4d;
    }
  }
`;
