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
        content: "세미나 더 알아보기",
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
    <ActivitiesContainer>
      <ActivitiesContent>
        <ActivitiesTitle>
          와플스튜디오에서는 무엇을 할 수 있나요?
        </ActivitiesTitle>
        <ActivitiesGrid>
          {activityData.map(({ title, content, imageUrl, button }, idx) => (
            <ActivitiesCard key={`activity-${idx}`}>
              <ImageWrapper>
                <img src={imageUrl} alt={title} />
              </ImageWrapper>
              <ActivitiesTextWrapper>
                <TextContent>
                  <ActivityTitle>{title}</ActivityTitle>
                  <ActivityDescription>{content}</ActivityDescription>
                </TextContent>
                {button && (
                  <CTAButton onClick={button.onAction}>
                    {button.content}
                  </CTAButton>
                )}
              </ActivitiesTextWrapper>
            </ActivitiesCard>
          ))}
        </ActivitiesGrid>
      </ActivitiesContent>
    </ActivitiesContainer>
  );
};

const ActivitiesContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background-color: #f4ff61;
`;

const ActivitiesContent = styled.div`
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const ActivitiesTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  align-self: stretch;
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.32px;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 20px;
  justify-content: center;

  @media (max-width: 1130px) {
    grid-template-columns: repeat(2, 250px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 250px;
  }
`;

const ActivitiesCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 219px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ActivitiesTextWrapper = styled.div`
  display: flex;
  padding: 20px 20px 24px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  flex: 1;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  flex: 1;
`;

const ActivityTitle = styled.div`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.2px;
`;

const ActivityDescription = styled.div`
  min-height: 120px;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.14px;
`;

const CTAButton = styled.button`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: #876e00;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;
