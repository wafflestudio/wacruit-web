import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./common";
import { WaffleIcon } from "./icons/WaffleIcon";

export default function Activity() {
  return (
    <Section>
      <SectionNumber>#2</SectionNumber>
      <SectionTitle>
        <h1>
          와플스튜디오 <span>주요 활동</span>
        </h1>
        <p>와플스튜디오에서 한 학기 동안 진행되는 활동</p>
      </SectionTitle>
      <ActivityCardArea>
        <ActivityCard>
          <CardTitle>
            <WaffleIcon size={31} color="#F0745F" />
            프로젝트
          </CardTitle>
          <CardDescription>
            와플스튜디오의 핵심 활동으로, 개발자와 디자이너가 팀을 이뤄
            프로젝트를 통해 서비스를 개발합니다.
          </CardDescription>
        </ActivityCard>
        <ActivityCard>
          <CardTitle>
            <WaffleIcon size={31} color="#F0745F" />
            세미나 및 토이프로젝트
          </CardTitle>
          <CardDescription>
            루키회원들을 대상으로 세미나가 진행되며, 학기말에는 토이프로젝트가
            진행됩니다.
          </CardDescription>
        </ActivityCard>
        <ActivityCard>
          <CardTitle>
            <WaffleIcon size={31} color="#F0745F" />
            굽기
          </CardTitle>
          <CardDescription>
            한학기 동안 진행하였던 프로젝트의 내용을 발표하고, 멤버들끼리
            자유롭게 의견을 나누는 행사입니다.
          </CardDescription>
        </ActivityCard>
        <ActivityCard>
          <CardTitle>
            <WaffleIcon size={31} color="#F0745F" />
            와커톤
          </CardTitle>
          <CardDescription>
            상품을 걸고, 멤버들끼리 팀을 짜고 며칠 간 집중적으로 프로덕트를
            만들어보는 해커톤 행사입니다.
          </CardDescription>
        </ActivityCard>
      </ActivityCardArea>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  background: #f6f6f6;
  padding: 100px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ActivityCardArea = styled.div`
  max-width: 980px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const ActivityCard = styled.div`
  padding: 30px 34px;
  width: 100%;
  border-radius: 29px;
  border: 1px solid #bd8379;

  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
  align-items: center;
`;

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #f0745f;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -1.3px;
`;

const CardDescription = styled.div`
  flex: 1 1 0;
  color: #857977;
  font-size: 18px;
  font-weight: 500;
  line-height: 160%; /* 28.8px */
  letter-spacing: 0.72px;
`;
