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
          title={{ kor: "루키", eng: "Rookie" }}
          description={{
            main: "서비스 개발에 필요한 지식을 쌓는 인원",
            sub: "한 학기 동안 세미나, 과제, 프로젝트를 진행하며 모든 과정 이수 시 정회원으로 승격됩니다.",
          }}
        ></MemberCard>
        <MemberCard
          image={"/image/home/members/Programmer.svg"}
          title={{ kor: "개발자", eng: "Programmer" }}
          description={{
            main: "서비스 기획 및 개발하는 인원",
            sub: "자율적으로 팀을 구성하여 활동할 수 있습니다.",
          }}
        ></MemberCard>
        <MemberCard
          image={"/image/home/members/Designer.svg"}
          title={{ kor: "디자이너", eng: "Designer" }}
          description={{
            main: "서비스 UI/UX 디자인을 하는 인원",
            sub: "팀에 참여하여 서비스 기획 및 디자인을 맡습니다.",
          }}
        ></MemberCard>
      </MemberCardArea>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MemberCardArea = styled.div`
  width: 100%;
  max-width: 140rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

interface MemberCardProps {
  image: string;
  title: { kor: string; eng: string };
  description: { main: string; sub: string };
}

const MemberCard = ({ image, title, description }: MemberCardProps) => {
  return (
    <CardContainer>
      <ImageArea>
        <img style={{ objectFit: "cover" }} src={image} alt="rookie" />
      </ImageArea>
      <ImageText>
        <h1>{title.kor}</h1>
        <p>{title.eng}</p>
      </ImageText>
      <Description>
        <h1>{description.main}</h1>
        <p>{description.sub}</p>
      </Description>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  width: 28rem;
  /* width: 31.0rem;
  border-radius: 1.0rem;
  padding: 3.0rem 1.5rem;
  box-shadow: 0.0rem 0.0rem 1.0rem rgba(0, 0, 0, 0.1);
  border: 0.1rem solid rgba(0, 0, 0, 0.1); */
`;

const ImageArea = styled.div`
  width: 15rem;
  height: 15rem;
`;

const ImageText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #c8604e;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 160%; /* 3.84rem */
  }
  p {
    color: #dab3ac;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 160%; /* 2.2399999999999998rem */
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  h1 {
    text-align: center;
    color: #525252;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 150%; /* 2.7rem */
  }
  p {
    text-align: center;
    color: #737373;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 140%; /* 1.9600000000000002rem */
    word-break: keep-all;
  }
`;
