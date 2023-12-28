import styled from "styled-components";
import Header from "../components/home/Header/Header";
import { MAILTO_RECRUIT } from "../common/const";
import { RecruitItem } from "../components/recruit/RecruitItem";

export default function RecruitList() {
  return (
    <>
      <Header />
      <Main>
        <Title>리크루팅 목록</Title>
        <Description>
          관련 질문이 있다면 <Mail href={MAILTO_RECRUIT}>{MAILTO_RECRUIT}</Mail>{" "}
          이메일로 문의주세요.
        </Description>
        <RecruitItemList>
          <RecruitItem
            title="프로그래머스 리크루팅"
            description="실무 경험이 있는 개발자를 모집합니다."
          />
          <RecruitItem
            title="디자이너 리크루팅"
            description="UI/UX 디자이너를 모집합니다."
          />
          <RecruitItem
            title="21.5기 리크루팅"
            description="23년도 하반기 세미나를 통해 개발자로 성장할 루키를 모집합니다."
            from={new Date(2021, 8, 1)}
            to={new Date(2021, 8, 30)}
          />
        </RecruitItemList>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 23vh max(50vw - 534px, 30px) 0;
`;

const Title = styled.h1`
  color: #222;
  font-size: 52px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: #484848;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 139px;
`;

const Mail = styled.a`
  font-weight: 500;
  text-decoration-line: underline;
`;

const RecruitItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
