import styled from "styled-components";
import { useHistoryQuery } from "../../../apis/history/history.query";
import { useEffect, useRef, useState } from "react";

export const WaffleHistory = () => {
  const { useGetHistories } = useHistoryQuery();
  const { data: historyData, isError } = useGetHistories();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!historyData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [historyData]);

  if (isError) {
    return (
      <HistoryContainer>
        <ErrorMessage>히스토리 정보를 불러오는데 실패했습니다.</ErrorMessage>
      </HistoryContainer>
    );
  }

  if (!historyData) return null;

  const getCardComponents = (id: number) => {
    const componentsMap = {
      1: {
        Card: StatCardBlue,
        Label: StatLabel,
        Number: StatNumber,
        Unit: StatUnit,
      },
      2: {
        Card: StatCardBrown,
        Label: StatLabel,
        Number: StatNumber,
        Unit: StatUnit,
      },
      3: {
        Card: StatCardGreen,
        Label: StatLabel,
        Number: StatNumber,
        Unit: StatUnit,
      },
      4: {
        Card: StatCardGray,
        Label: StatLabelBlack,
        Number: StatNumberBlack,
        Unit: StatUnitBlack,
      },
    };
    return componentsMap[id as keyof typeof componentsMap];
  };

  return (
    <HistoryContainer ref={sectionRef}>
      <HistoryContent>
        <HistoryTextBlock>
          <HistoryTitle>서울대 개발 커뮤니티의 중심</HistoryTitle>
          <HistoryDescription>
            서울대학교 컴퓨터공학부 소속 개발 동아리인 와플스튜디오에서는 개발을
            좋아하는 서울대학교 학생들의 네트워크를 형성하고, 함께 성장할 수
            있는 기회를 제공합니다.
            <br />
            공익적 목적으로 모든 인원이 자율적으로 프로젝트에 참여하여 모두에게
            도움이 되는 가치를 창출하는 것을 목표로 하며, 전공과 학번에 상관없이
            모든 학생들에게 열려 있습니다.
          </HistoryDescription>
        </HistoryTextBlock>

        <HistoryStack>
          {historyData.map((item) => {
            const components = getCardComponents(item.id);
            if (!components) return null;

            const { Card, Label, Number: NumberComponent, Unit } = components;

            return (
              <Card key={item.id} $isVisible={isVisible}>
                <Label>{item.history_key}</Label>
                <StatValueWrapper>
                  <NumberComponent>{item.history_value}</NumberComponent>
                  <Unit>{item.history_unit}</Unit>
                </StatValueWrapper>
              </Card>
            );
          })}
        </HistoryStack>
      </HistoryContent>
    </HistoryContainer>
  );
};

const HistoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background-color: #121212;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.white};
  padding: 60px 20px;
`;

const HistoryContent = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HistoryTextBlock = styled.div`
  display: flex;
  min-width: 400px;
  padding: 100px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex: 1 0 0;

  @media (max-width: 1200px) {
    min-width: unset;
    padding: 60px 20px;
  }
`;

const HistoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[40]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.4px;
  margin: 0;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes[32]};
  }
`;

const HistoryDescription = styled.p`
  max-width: 800px;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.18px;
  margin: 0;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes[16]};
  }
`;

const HistoryStack = styled.div`
  position: relative;
  width: 849px;
  height: auto;
  flex: 1 0 0;
  aspect-ratio: 849 / 652;
  overflow: hidden;
  container-type: inline-size;

  @media (max-width: 1200px) {
    flex: none;
    width: 100%;
  }

  @media (max-width: 767px) {
    aspect-ratio: unset;
    height: 763px;
    overflow: visible;
  }
`;

const StatCardGray = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  right: 46.64%;
  display: flex;
  width: 40.52%;
  height: 35.58%;
  padding: clamp(12px, 2.36cqw, 20px) clamp(16px, 3.06cqw, 26px);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: clamp(15px, 2.83cqw, 24px);
  background: #efebeb;
  opacity: 0;
  animation: ${({ $isVisible }) =>
    $isVisible
      ? "dropWithBounce 1.0s cubic-bezier(0.25, 0.1, 0.25, 1) forwards"
      : "none"};

  @keyframes dropWithBounce {
    0% {
      opacity: 1;
      transform: translateY(-100vh);
    }
    55% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(-15px);
    }
    82% {
      transform: translateY(0);
    }
    93% {
      transform: translateY(-8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }

  @media (max-width: 767px) {
    bottom: 196.608px;
    left: 10%;
    top: unset;
    right: unset;
    width: 64.71%;
    height: 146.196px;
    animation: ${({ $isVisible }) =>
      $isVisible
        ? "dropWithBounce 1.0s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s forwards"
        : "none"};
  }
`;

const StatLabel = styled.div`
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: clamp(12px, 2.36cqw, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.2px;

  @media (max-width: 1200px) {
    font-size: clamp(10px, 2cqw, 16px);
  }

  @media (max-width: 767px) {
    font-size: clamp(12px, 3.5cqw, 16px);
  }
`;

const StatLabelBlack = styled.div`
  color: #121212;
  font-family: "Pretendard Variable";
  font-size: clamp(12px, 2.36cqw, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.2px;

  @media (max-width: 1200px) {
    font-size: clamp(10px, 2cqw, 16px);
  }

  @media (max-width: 767px) {
    font-size: clamp(12px, 3.5cqw, 16px);
  }
`;

const StatValueWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 4px;
  width: 100%;
`;

const StatNumber = styled.span`
  color: #fff;
  font-family: "Gmarket Sans";
  font-size: clamp(30px, 9.43cqw, 80px);
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 1200px) {
    font-size: clamp(28px, 8cqw, 65px);
  }

  @media (max-width: 767px) {
    font-size: clamp(36px, 11cqw, 52px);
  }
`;

const StatNumberBlack = styled.span`
  color: #121212;
  font-family: "Gmarket Sans";
  font-size: clamp(30px, 9.43cqw, 80px);
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 1200px) {
    font-size: clamp(28px, 8cqw, 65px);
  }

  @media (max-width: 767px) {
    font-size: clamp(36px, 11cqw, 52px);
  }
`;

const StatUnit = styled.span`
  color: #fff;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: clamp(20px, 4.71cqw, 40px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.4px;

  @media (max-width: 1200px) {
    font-size: clamp(14px, 4cqw, 32px);
  }

  @media (max-width: 767px) {
    font-size: clamp(14px, 5cqw, 28px);
  }
`;

const StatUnitBlack = styled.span`
  color: #121212;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: clamp(20px, 4.71cqw, 40px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.4px;

  @media (max-width: 1200px) {
    font-size: clamp(14px, 4cqw, 32px);
  }

  @media (max-width: 767px) {
    font-size: clamp(14px, 5cqw, 28px);
  }
`;

const StatCardBlue = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 39%;
  left: 4%;
  display: flex;
  width: 42.46%;
  height: 52%;
  padding: clamp(12px, 2.36cqw, 20px) clamp(16px, 3.06cqw, 26px);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: clamp(15px, 2.83cqw, 24px);
  background: #37007f;
  opacity: 0;
  animation: ${({ $isVisible }) =>
    $isVisible
      ? "dropWithBounceBlue 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s forwards"
      : "none"};

  @keyframes dropWithBounceBlue {
    0% {
      opacity: 1;
      transform: translateY(-100vh) rotate(-12.342deg);
    }
    55% {
      transform: translateY(0) rotate(-12.342deg);
    }
    70% {
      transform: translateY(-15px) rotate(-12.342deg);
    }
    82% {
      transform: translateY(0) rotate(-12.342deg);
    }
    93% {
      transform: translateY(-8px) rotate(-12.342deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(-12.342deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: rotate(-12.342deg);
    transition: opacity 0.3s ease-in-out;
  }

  @keyframes dropWithBounceBlueNoRotate {
    0% {
      opacity: 1;
      transform: translateY(-100vh);
    }
    55% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(-15px);
    }
    82% {
      transform: translateY(0);
    }
    93% {
      transform: translateY(-8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 767px) {
    bottom: 342.804px;
    right: 0;
    top: unset;
    left: unset;
    width: 67.81%;
    height: 210.967px;
    animation: ${({ $isVisible }) =>
      $isVisible
        ? "dropWithBounceBlueNoRotate 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s forwards"
        : "none"};
  }

  @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
    transform: none;
  }
`;

const StatCardGreen = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 54%;
  right: 10%;
  display: flex;
  width: 39.81%;
  height: 38.8%;
  padding: clamp(12px, 2.36cqw, 20px) clamp(16px, 3.06cqw, 26px);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: clamp(15px, 2.83cqw, 24px);
  background: #00cd48;
  opacity: 0;
  animation: ${({ $isVisible }) =>
    $isVisible
      ? "dropWithBounceGreen 1.3s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s forwards"
      : "none"};

  @keyframes dropWithBounceGreen {
    0% {
      opacity: 1;
      transform: translateY(-100vh) rotate(16.315deg);
    }
    55% {
      transform: translateY(0) rotate(16.315deg);
    }
    70% {
      transform: translateY(-15px) rotate(16.315deg);
    }
    82% {
      transform: translateY(0) rotate(16.315deg);
    }
    93% {
      transform: translateY(-8px) rotate(16.315deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(16.315deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: rotate(16.315deg);
    transition: opacity 0.3s ease-in-out;
  }

  @keyframes dropWithBounceGreenMobile {
    0% {
      opacity: 1;
      transform: translateY(-100vh) rotate(13.811deg);
    }
    55% {
      transform: translateY(0) rotate(13.811deg);
    }
    70% {
      transform: translateY(-15px) rotate(13.811deg);
    }
    82% {
      transform: translateY(0) rotate(13.811deg);
    }
    93% {
      transform: translateY(-8px) rotate(13.811deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(13.811deg);
    }
  }

  @media (max-width: 767px) {
    bottom: 575px;
    left: 10%;
    top: unset;
    right: unset;
    width: 63.58%;
    height: 159.429px;
    animation: ${({ $isVisible }) =>
      $isVisible
        ? "dropWithBounceGreenMobile 1.3s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s forwards"
        : "none"};
  }

  @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
    transform: rotate(13.811deg);
  }
`;

const StatCardBrown = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  width: 46.64%;
  height: 47.85%;
  padding: clamp(12px, 2.36cqw, 20px) clamp(16px, 3.06cqw, 26px);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: clamp(15px, 2.83cqw, 24px);
  background: #876e00;
  opacity: 0;
  animation: ${({ $isVisible }) =>
    $isVisible
      ? "dropWithBounceBrown 1.1s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s forwards"
      : "none"};

  @keyframes dropWithBounceBrown {
    0% {
      opacity: 1;
      transform: translateY(-100vh);
    }
    55% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(-15px);
    }
    82% {
      transform: translateY(0);
    }
    93% {
      transform: translateY(-8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }

  @media (max-width: 767px) {
    bottom: 0;
    right: 10%;
    top: unset;
    left: unset;
    width: 74.49%;
    height: 196.608px;
    animation: ${({ $isVisible }) =>
      $isVisible
        ? "dropWithBounceBrown 1.1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards"
        : "none"};
  }
`;
