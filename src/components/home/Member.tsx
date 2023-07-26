import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./common";

export default function Member() {
  return (
    <Section>
      <SectionNumber>#1</SectionNumber>
      <SectionTitle>
        <h1>
          와플스튜디오 <span>멤버 구성</span>
        </h1>
        <p>와플스튜디오를 이끌어가는 3파트의 멤버 구성</p>
      </SectionTitle>
      <MemberCardArea>
        <MemberCard
          image={"/image/home/members/Rookie.svg"}
          title={["루키", "Rookie"]}
          description={[
            "서비스 개발에 필요한 지식을 쌓는 인원",
            "한 학기 동안 세미나, 과제, 프로젝트를 진행하며 모든 과정 이수 시 정회원으로 승격됩니다.",
          ]}
        ></MemberCard>
        <MemberCard
          image={"/image/home/members/Programmer.svg"}
          title={["개발자", "Programmer"]}
          description={[
            "서비스 기획 및 개발하는 인원",
            "자율적으로 팀을 구성하여 활동할 수 있습니다.",
          ]}
        ></MemberCard>
        <MemberCard
          image={"/image/home/members/Designer.svg"}
          title={["디자이너", "Designer"]}
          description={[
            "서비스 UI/UX 디자인을 하는 인원",
            "팀에 참여하여 서비스 기획 및 디자인을 맡습니다.",
          ]}
        ></MemberCard>
      </MemberCardArea>
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

const MemberCardArea = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

interface MemberCardProps {
  image: string;
  title: string[];
  description: string[];
}

const MemberCard = ({ image, title, description }: MemberCardProps) => {
  return (
    <CardContainer>
      <ImageArea>
        <img style={{ objectFit: "cover" }} src={image} alt="rookie" />
      </ImageArea>
      <ImageText>
        <h1>{title[0]}</h1>
        <p>{title[1]}</p>
      </ImageText>
      <Description>
        <h1>{description[0]}</h1>
        <p>{description[1]}</p>
      </Description>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  width: 280px;
  /* width: 310px;
  border-radius: 10px;
  padding: 30px 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1); */
`;

const ImageArea = styled.div`
  width: 150px;
  height: 150px;
`;

const ImageText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #c8604e;
    font-size: 24px;
    font-weight: 700;
    line-height: 160%; /* 38.4px */
  }
  p {
    color: #dab3ac;
    font-size: 14px;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;

  h1 {
    text-align: center;
    color: #525252;
    font-size: 18px;
    font-weight: 600;
    line-height: 150%; /* 27px */
  }
  p {
    text-align: center;
    color: #737373;
    font-size: 14px;
    font-weight: 400;
    line-height: 140%; /* 19.6px */
    word-break: keep-all;
  }
`;
