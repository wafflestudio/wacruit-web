import Header from "../components/home/Header/Header";
import { ProgrammerRecruitInfo } from "../components/programmer/ProgrammerRecruitInfo";
import styled from "styled-components";
import { MAIL_RECRUIT } from "../common/const";
import { generateMailUrl } from "../common/utils";

export const ProgrammersRecruitInfoPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Title>프로그래머스 / 디자이너(정회원) 리크루팅</Title>
        <Description>
          {" "}
          관련 질문이 있다면 <Mail
            href={generateMailUrl(MAIL_RECRUIT)}
          ></Mail>{" "}
          이메일로 문의주세요.
        </Description>
        <ProgrammerRecruitInfo />
      </Main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 23vh max(50vw - 53.4rem, 3rem) 3rem;
`;

const Title = styled.h1`
  color: #222;
  font-size: 5.2rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
`;

const Description = styled.p`
  color: #484848;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 3rem;
`;

const Mail = styled.a`
  font-weight: 500;
  text-decoration-line: underline;
`;
