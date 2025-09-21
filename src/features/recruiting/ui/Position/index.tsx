import styled from "styled-components";
import { RecruitingCTAButton } from "../../../../shared/ui/button/RecruitingCTAButton";
import { PositionsMain } from "./PositionsMain";
// import { useRecruitingTimelineQuery } from "../../../entities/api/useRecruitingTimelineQuery";
// import { RecruitingType } from "../../../entities/recruiting/types";
// import { formatPositionByEnglish } from "../lib/formatPositionByEnglish";

const PositionsContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: var(--grey, #efebeb);
`;

const PositionContent = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
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
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
`;

const PositionSubtitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
`;

const PositionsCTA = styled.button`
  display: flex;
  padding: 10px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  // border-radius: 4px;
  // background: var(--pink, #FF2C4C);
`;

export const Positions = () => {
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

        <PositionsMain />

        <PositionsCTA>
          <RecruitingCTAButton />
        </PositionsCTA>
      </PositionContent>
    </PositionsContainer>
  );
};
