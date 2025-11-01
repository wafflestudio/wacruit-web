import styled from "styled-components";
// import WaffleStack from "../../../components/icons/home/WaffleStack.svg?react";

export const WaffleHistory = () => {
  return (
    <HistoryContainer>
      <HistoryContent>
        <HistoryTextBlock>
          <HistoryTitle>서울대 개발 커뮤니티의 중심</HistoryTitle>
          <HistoryDescription>
            와플스튜디오에서는 개발을 좋아하는 서울대학교 학생들의 네트워크를
            형성하고, 함께 성장할 수 있는 기회를 제공합니다. 전공과 학번에
            상관없이 모든 학생들에게 열려 있습니다. 공익적 목적으로 모든 인원이
            자율적으로 프로젝트에 참여하여 모두에게 도움이 되는 가치를 창출하는
            것을 목표로 합니다.
          </HistoryDescription>
        </HistoryTextBlock>
        {/* <WaffleStack/> */}
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

const HistoryContent = styled.div`
  display: flex;
  max-width: 1600px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;
`;

const HistoryTextBlock = styled.div`
  display: flex;
  min-width: 400px;
  padding: 100px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex: 1 0 0;
`;

const HistoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[40]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 60px */
  letter-spacing: -0.4px;
`;

const HistoryDescription = styled.p`
  max-width: 800px;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.black[100]};

  /* 18/Medium */
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
`;
