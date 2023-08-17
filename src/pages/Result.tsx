import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/home/Header/Header";

export default function Result() {
  const params = useParams();
  // const { result } = useLoaderData() as ResultLoaderReturnType;

  // if (result.status === 1 ) { //status가 합격일 때
  if (params.recruit_id === "1") {
    // TODO: 서버에서 가져오는 결과로 변경
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
              어쩌고저쩌고~ <br />몇 줄인지는 모르겠지만
            </Description>
            <Contact>
              기타 문의사항은{" "}
              <a href="mailto:recruit@wafflestudio.com ">
                mailto:recruit@wafflestudio.com
              </a>{" "}
              이메일로 문의주세요.
            </Contact>
          </Container>
        </Main>
      </>
    );
  }

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
            지원에 주서 감사합니다.
            <br />
            어쩌고저쩌고~ <br />몇 줄인지는 모르겠지만
          </Description>
          <Contact>
            기타 문의사항은{" "}
            <a href="mailto:recruit@wafflestudio.com ">
              mailto:recruit@wafflestudio.com
            </a>{" "}
            이메일로 문의주세요.
          </Contact>{" "}
        </Container>
      </Main>
    </>
  );
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
  line-height: 150%; /* 36px */
  margin-bottom: 36px;
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
