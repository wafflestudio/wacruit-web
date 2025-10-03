import styled from "styled-components";
import { RecruitingCTAButton } from "../../../shared/ui/button/RecruitingCTAButton";
import { PositionTab } from "./PositionTab";

export const Position = () => {
  return (
    <PositionsContainer>
      <PositionContent>
        <PositionsHeader>
          <PositionTitle>모집 파트</PositionTitle>
          <PositionSubtitle>
            와플스튜디오의 회원은 준회원(Rookies), 정회원(Programmers),
            디자이너로 나뉘어 있습니다.
          </PositionSubtitle>
        </PositionsHeader>

        <PositionTab />

        <PositionsCTA>
          <RecruitingCTAButton />
        </PositionsCTA>
      </PositionContent>
    </PositionsContainer>
  );
};

const PositionsContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.grey || "#efebeb"};
`;

const PositionContent = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: 100%;
`;

const PositionsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`;

const PositionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 150%;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.colors.black[900]};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[28]};
    letter-spacing: -0.28px;
  }
`;

const PositionSubtitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 150%;
  letter-spacing: -0.18px;
  color: ${({ theme }) => theme.colors.black[900]};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[16]};
    letter-spacing: -0.16px;
  }
`;

const PositionsCTA = styled.div`
  display: flex;
  padding: 10px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
