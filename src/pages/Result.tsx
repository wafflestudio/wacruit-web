import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Headerv2 from "../shared/ui/header/HeaderV2";
import HeaderSpacer from "../shared/ui/header/HeaderSpacer";
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
        <Headerv2 />
        <HeaderSpacer />
        <Main>
          <Container>
            <LogoWrapper>
              <img src="/image/result/fail.svg" alt="" />
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
        <Headerv2 />
        <HeaderSpacer />
        <Main>
          <Container>
            <LogoWrapper>
              <img src="/image/result/pass.svg" alt="" />
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
      <Headerv2 />
      <HeaderSpacer />
      <Main>
        <Container>
          <LogoWrapper>
            <img src="/image/result/pass.svg" alt="" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 10.1rem);
  padding: 8rem 2rem 12rem;

  @media (max-width: 768px) {
    min-height: calc(100vh - 9.2rem);
    padding: 6rem 2rem 8rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  width: 100%;
  max-width: 64rem;
  text-align: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 1.2rem;

  img {
    display: block;
    width: 20rem;
    height: auto;

    @media (max-width: 768px) {
      width: 15rem;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[24]};
  }
`;

const Emphasis = styled.span`
  color: ${({ theme }) => theme.colors.oak};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 1.7;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;

const Contact = styled.p`
  margin: 1.2rem 0 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.base};

  a {
    color: ${({ theme }) => theme.colors.black[900]};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
`;
