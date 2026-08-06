import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/home/Header/Header";
import { ResultLoaderReturnType } from "./Loader/ResultLoader";
import { recruitingDetailQuery } from "./Loader/DashboardLoader";
import { useEffect } from "react";
import { MAIL_RECRUIT, ORIENTATION_DATE } from "../common/const";
import { generateMailUrl } from "../common/utils";
import { RecruitingResultCode } from "../apis/recruiting/recruiting.types";

export default function Result() {
  const { result } = useLoaderData() as ResultLoaderReturnType;
  const params = useParams();
  const recruitId = Number(params.recruit_id);
  const { data: recruiting } = useQuery({
    ...recruitingDetailQuery(recruitId),
    enabled: !Number.isNaN(recruitId),
    retry: 0,
  });
  const recruitingName = recruiting?.name ?? "이번 리크루팅";

  if (result.status === RecruitingResultCode.REJECTED) {
    //불합격 시
    return (
      <>
        <Header />
        <Main>
          <Container>
            <LogoWrapper>
              <img src="/image/result/fail.svg"></img>
            </LogoWrapper>
            <Title>합격자 명단에 없습니다.</Title>
            <Description>
              와플스튜디오 리크루팅에 참여해 주셔서 감사드립니다.
              <br />
              지원서를 검토한 결과, 아쉽게도 {recruitingName} 합격자 명단에
              포함되지 않았음을 알려드립니다.
              <br />
              지원해 주신 노력에 진심으로 감사드리며, 미래에 더 나은 기회가
              있기를 바라며 응원하겠습니다. 감사합니다.
            </Description>
            <Contact>
              기타 문의사항은{" "}
              <a href={generateMailUrl(MAIL_RECRUIT)}>{MAIL_RECRUIT}</a>{" "}
              이메일로 문의주세요.
            </Contact>{" "}
          </Container>
        </Main>
      </>
    );
  }

  if (result.status === RecruitingResultCode.ACCEPTED) {
    //합격 시
    return (
      <>
        <Header />
        <Main>
          <Container>
            <LogoWrapper>
              <img src="/image/result/pass.svg"></img>
            </LogoWrapper>
            <Title>
              와플스튜디오 <Emphasis>합격</Emphasis>을 축하드립니다!
            </Title>
            <Description>
              지원 시 적어주셨던 이메일로 디스코드 초대 예정입니다. <br />
              또한 {ORIENTATION_DATE}에 루키/디자이너 OT 및 개강 파티가 진행될
              예정이니 참고 바랍니다. <br />
              OT 참석은 필수이며, 부득이하게 참석이 어려운 경우 디스코드로
              운영팀에 문의해주세요.
            </Description>
            <Contact>
              기타 문의사항은{" "}
              <a href={generateMailUrl(MAIL_RECRUIT)}>{MAIL_RECRUIT}</a>{" "}
              이메일로 문의주세요.
            </Contact>
          </Container>
        </Main>
      </>
    );
  }

  //결과가 없을 시
  return (
    <>
      <Header />
      <Main>
        <Container>
          <LogoWrapper>
            <img src="/image/result/pass.svg"></img>
          </LogoWrapper>
          <Title>아직 합/불 결과가 나오지 않았습니다.</Title>
          <Contact>
            기타 문의사항은{" "}
            <a href={generateMailUrl(MAIL_RECRUIT)}>{MAIL_RECRUIT}</a> 이메일로
            문의주세요.
          </Contact>
        </Container>
      </Main>
    </>
  );
}

export function NoResult() {
  const navigate = useNavigate();
  useEffect(() => {
    alert("지원하지 않은 리크루팅입니다.");
    navigate("../");
  }, [navigate]);
  return <div></div>;
}
const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110rem;
  padding: 6rem 0;
`;

const LogoWrapper = styled.div`
  margin-bottom: 4.8rem;
`;

const Title = styled.div`
  color: #222;
  font-size: 5.2rem;
  font-weight: 700;
  margin-bottom: 3.6rem;
`;
const Emphasis = styled.span`
  color: #f0745f;
  font-size: 6.4rem;
  font-weight: 700;
`;
const Description = styled.div`
  color: #484848;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 3.6rem;
  word-break: keep-all;
`;
const Contact = styled.div`
  color: #484848;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  a {
    color: #484848;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-weight: 500;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
