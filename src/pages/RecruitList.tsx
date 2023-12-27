import styled from "styled-components";
import Header from "../components/home/Header/Header";
import { MAILTO_RECRUIT } from "../common/const";

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
        <RecruitListContainer />
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

function RecruitListContainer() {
  return (
    <Container>
      <RecruitItemComponent
        title="프로그래머스 리크루팅"
        description="실무 경험이 있는 개발자를 모집합니다."
      />
      <RecruitItemComponent
        title="디자이너 리크루팅"
        description="UI/UX 디자이너를 모집합니다."
      />
      <RecruitItemComponent
        title="21.5기 리크루팅"
        description="23년도 하반기 세미나를 통해 개발자로 성장할 루키를 모집합니다."
        from={new Date(2021, 8, 1)}
        to={new Date(2021, 8, 30)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

type RecruitItemComponentProps = {
  title: string;
  description: string;
  from?: Date;
  to?: Date;
};

function RecruitItemComponent({
  title,
  description,
  from,
  to,
}: RecruitItemComponentProps) {
  return (
    <RecruitItem to={to}>
      <RecruitTitle>{title}</RecruitTitle>
      <RecruitDescription>
        {from && to
          ? `${from.toISOString().split("T")[0]} ~ ${
              to.toISOString().split("T")[0]
            }`
          : "상시 모집"}
        <RecruitDescriptionSeperator />
        {description}
      </RecruitDescription>
    </RecruitItem>
  );
}

const RecruitItem = styled.div<{ to?: Date }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 48px;
  color: ${({ to }) =>
    to && to.getMilliseconds() < Date.now() ? "#AAA" : "#3F3F3F"};

  border-left: 5px solid
    ${({ to }) =>
      to && to.getMilliseconds() < Date.now() ? "#C8C8C8" : "#3f3f3f"};
  background: #fff;
  box-shadow: -4px 0px 10px 0px rgba(0, 0, 0, 0.04);
`;

const RecruitTitle = styled.h2`
  color: #3f3f3f;
  font-size: 28px;
  font-weight: 600;
  line-height: 140%;
`;

const RecruitDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 140%;
`;

const RecruitDescriptionSeperator = styled.div`
  width: 1px;
  height: 20px;
`;
