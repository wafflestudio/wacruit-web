import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./style";

export default function Service() {
  return (
    <Section>
      <SectionNumber>#3</SectionNumber>
      <SectionTitle>
        <h1>
          와플스튜디오 <span>출시 서비스</span>
        </h1>
        <p>와플스튜디오의 프로젝트로 시작해 실제 사용되고 있는 서비스</p>
      </SectionTitle>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
