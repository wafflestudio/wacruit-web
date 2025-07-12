import styled from "styled-components";

export const Activities = () => {
  const activityData = [
    {
      title: "서비스 개발",
      content:
        "아이디어 발굴부터 서비스 출시의 과정에서 개발 역량을 키우고 협업 경험을 쌓을 수 있습니다. 또한 수많은 사람들이 사용하는 서비스 개발팀에 합류할 수도 있어요.",
      imageUrl: "/",
      button: {
        content: "프로젝트 더 알아보기",
        onAction: () => {
          return;
        },
      },
    },
    {
      title: "개발 스터디",
      content:
        "개발/디자인과 관련된 주제로 자유롭게 스터디를 진행합니다. 네트워크, 클린코드, 아키텍처, 인터렉티브 스터디 등 다양한 주제의 스터디가 열렸습니다.",
      imageUrl: "/",
      button: {
        content: "스터디 더 알아보기",
        onAction: () => {
          return;
        },
      },
    },
    {
      title: "세미나",
      content:
        "개발이 처음이라도 세미나를 통해 배워나갈 수 있어요. 개발을 처음 배우는 회원들을 대상으로 2학기에 개발 세미나를 진행해요. 과제와 세미나를 통해 개발자로 한걸음 성장할 수 있어요.",
      imageUrl: "/",
      button: {
        content: "스터디 더 알아보기",
        onAction: () => {
          return;
        },
      },
    },
    {
      title: "친목과 네트워킹",
      content:
        "홈커밍데이, 동아리 내 해커톤(와커톤), MT 등 다양한 활동을 통해 개발에 관심있는 학생들과 네트워킹할 수 있어요. 또한 학기말마다 수행하는 굽기 활동을 통해 한 학기간의 기술과 경험을 공유하는 시간도 가집니다.",
      imageUrl: "/",
    },
  ];
  return (
    <Container>
      <Title>와플스튜디오에서는 무엇을 할 수 있나요?</Title>
      <CardList>
        {activityData.map(({ title, content, imageUrl, button }, idx) => (
          <Card key={`history-${idx}`}>
            <ImageWrapper>
              <img src={imageUrl} alt={title} />
            </ImageWrapper>
            <TextWrapper>
              <h5>{title}</h5>
              <p>{content}</p>
              {button && (
                <ActionButton onClick={button.onAction}>
                  {button.content}
                </ActionButton>
              )}
            </TextWrapper>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-align: center;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 960px;
`;

const Card = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  h5 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const ActionButton = styled.button`
  display: inline-block;
  background-color: #ff6f61;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e55b4d;
  }
`;
