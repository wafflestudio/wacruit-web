import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/home/Header/Header";
import { ResultLoaderReturnType } from "./Loader/ResultLoader";
import { useEffect } from "react";
import { MAILTO_RECRUIT } from "../common/const";
import { RecruitingResultCode } from "../types/apiTypes";

export default function Result() {
  const { result } = useLoaderData() as ResultLoaderReturnType;
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
              지원서를 검토한 결과, 아쉽게도 21.5기 루키 합격자 명단에 포함되지
              않았음을 알려드립니다.
              <br />
              지원해 주신 노력에 진심으로 감사드리며, 미래에 더 나은 기회가
              있기를 바라며 응원하겠습니다. 감사합니다.
            </Description>
            <Contact>
              기타 문의사항은 <a href={MAILTO_RECRUIT}>{MAILTO_RECRUIT}</a>{" "}
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
              지원 시 적어주셨던 이메일로 슬랙 및 노션 초대 예정입니다. <br />
              또한 8월 20일 (일요일) 오후 2시에 루키 오리엔테이션이 진행될
              예정이니 참고 바랍니다. 오티 참석은 필수입니다.
            </Description>
            <Contact>
              기타 문의사항은 <a href={MAILTO_RECRUIT}>{MAILTO_RECRUIT}</a>{" "}
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
            기타 문의사항은 <a href={MAILTO_RECRUIT}>{MAILTO_RECRUIT}</a>{" "}
            이메일로 문의주세요.
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
  }, []);
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
  width: 1100px;
  padding: 60px 0;
`;

const LogoWrapper = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.div`
  color: #222;
  font-size: 52px;
  font-weight: 700;
  margin-bottom: 36px;
`;
const Emphasis = styled.span`
  color: #f0745f;
  font-size: 64px;
  font-weight: 700;
`;
const Description = styled.div`
  color: #484848;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 36px;
  word-break: keep-all;
`;
const Contact = styled.div`
  color: #484848;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  a {
    color: #484848;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
