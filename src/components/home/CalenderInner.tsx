import styled from "styled-components";

interface CalenderInnerProps {
  select: "ROOKIE" | "DESIGNER" | "PROGRAMMER";
}

export default function CalenderInner({ select }: CalenderInnerProps) {
  return (
    <Section>
      <ImageArea>
        {select === "ROOKIE" && (
          <img
            style={{ width: "10.5rem", height: "10.5rem" }}
            src={"/image/home/members/Rookie.svg"}
            alt="rookie img"
          />
        )}
        {select === "DESIGNER" && (
          <img
            style={{ width: "10.5rem", height: "10.5rem" }}
            src={"/image/home/members/Designer.svg"}
            alt="designer img"
          />
        )}
        {select === "PROGRAMMER" && (
          <img
            style={{ width: "10.5rem", height: "10.5rem" }}
            src={"/image/home/members/Programmer.svg"}
            alt="programmer img"
          />
        )}
      </ImageArea>
      {select === "ROOKIE" && (
        <TextArea>
          <InnerTop>
            <TopTitle>
              <h1>루키(ROOKIE)</h1>
              <p>
                개발 경험이 많지 않거나 와플스튜디오에서 제공하는 세미나를
                통해서 <span>기본부터 다잡고 싶으신 분들</span>
              </p>
            </TopTitle>
            <TopDescription>
              <li>
                프로그래밍 언어를 접해본 경험이 있고,{" "}
                <span>웹/앱 개발에 관심이 있는 분들</span>을 대상으로 합니다.
              </li>
              <li>
                다른 개발자들과 원활하게 소통하며 다양한 프로젝트를 통해
                성장해나갈 <span>열정이 있는 분들 환영</span>합니다.
              </li>
              <li>
                준회원으로서, 2학기에 진행되는 <span>세미나와 과제</span>를
                통과하면 정회원인 Programmers로 승격할 수 있는 자격을 얻습니다.
              </li>
            </TopDescription>
          </InnerTop>
          <InnerBottom>
            <h1>지원방법 및 일정</h1>
            <Step>
              <StepImage>
                <img src={"/image/home/process/Paper.svg"} alt="step1" />
              </StepImage>
              <StepDescription>
                <span>STEP 01</span>
                <h1>자기소개서 제출 및 코딩테스트 응시</h1>
                <p>8월 18일(일) 23:59시까지 위 사항을 완료해주셔야 합니다.</p>
              </StepDescription>
            </Step>
            <Step>
              <StepImage>
                <img src={"/image/home/process/Siren.svg"} alt="step2" />
              </StepImage>
              <StepDescription>
                <span>STEP 02</span>
                <h1>루키회원 합격자 발표</h1>
                <p>
                  합격자 발표는 8월 23일(금) 리크루팅 사이트로 공개될
                  예정입니다.
                </p>
              </StepDescription>
            </Step>
            <Step>
              <StepImage>
                <img src={"/image/home/process/People.svg"} alt="step2" />
              </StepImage>
              <StepDescription>
                <span>STEP 03</span>
                <h1>전체 신입회원 오리엔테이션</h1>
                <p>9월 1일(일) 비대면으로 진행됩니다.</p>
              </StepDescription>
            </Step>
          </InnerBottom>
        </TextArea>
      )}
      {select === "DESIGNER" && (
        <TextArea>
          <InnerTop>
            <TopTitle>
              <h1>디자이너(Designer)</h1>
              <p>
                와플스튜디오의 새로운 프로젝트에 참여하여{" "}
                <span>UI/UX Design을 진행해 주실 분들</span>
              </p>
            </TopTitle>
            <TopDescription>
              <li>
                프로젝트 아이디어를 제시하고 계획할 수 있으며, 진행할 프로젝트
                앱/웹의 UI/UX를 디자인합니다.
              </li>
              <li>
                <span>Figma</span> 등의 툴을 사용해본 경험이 있거나,{" "}
                <span>UI/UX Design에 열정과 관심</span>이 있는 분들을 찾습니다.
              </li>
              <li>
                <span>포토샵, 일러스트레이터</span> 사용 경험이 있으시면
                좋습니다!
              </li>
              <li>
                툴 사용 경험이 많지 않으신 분들 한해서 <span>스터디</span>도
                함께 진행할 예정입니다.
              </li>
            </TopDescription>
          </InnerTop>
          <InnerBottom>
            <h1>지원방법 및 일정</h1>
            <Step>
              <StepImage>
                <img src={"/image/home/process/Paper.svg"} alt="step1" />
              </StepImage>
              <StepDescription>
                <span>STEP 01</span>
                <h1>자기소개서 및 포트폴리오(프로젝트 3개 이상) 제출</h1>
                <p>8월 18일(일) 23:59시까지 위 사항을 완료해주셔야 합니다.</p>
              </StepDescription>
            </Step>
            <Step>
              <StepImage>
                <img src={"/image/home/process/Siren.svg"} alt="step2" />
              </StepImage>
              <StepDescription>
                <span>STEP 02</span>
                <h1>디자이너 회원 합격자 발표</h1>
                <p>
                  합격자 발표는 8월 23일(금) 리크루팅 사이트로 공개될
                  예정입니다.
                </p>
              </StepDescription>
            </Step>
            <Step>
              <StepImage>
                <img src={"/image/home/process/People.svg"} alt="step2" />
              </StepImage>
              <StepDescription>
                <span>STEP 03</span>
                <h1>전체 신입회원 오리엔테이션</h1>
                <p>9월 1일(일) 비대면으로 진행됩니다.</p>
              </StepDescription>
            </Step>
          </InnerBottom>
        </TextArea>
      )}
      {select === "PROGRAMMER" && (
        <TextArea>
          <InnerTop>
            <TopTitle>
              <h1>개발자(Programmer)</h1>
              <p>
                와플스튜디오의 새로운 프로젝트에 참여하여{" "}
                <span>웹/앱 개발을 진행해 주실 분들</span>
              </p>
            </TopTitle>
            <TopDescription>
              <li>
                프로젝트 아이디어를 제시하고 계획할 수 있으며, 진행할 프로젝트
                앱/웹의 개발을 진행합니다.
              </li>
              <li>
                <span>React, UIKit, JetpackCompose, Django, Spring</span> 등의
                프레임워크를 사용해보신 적이 있고{" "}
                <span>웹/앱 개발에 열정과 관심</span>이 있는 분들을 찾습니다.
              </li>
              <li>
                <span>프론트엔드, 백엔드 개발</span>을 모두 해보고 싶으신 분들을
                찾습니다.
              </li>
            </TopDescription>
          </InnerTop>
          <InnerBottom>
            <h1>지원방법 및 일정</h1>
            <Step>
              <StepImage>
                <img src={"/image/home/process/Paper.svg"} alt="step1" />
              </StepImage>
              <StepDescription>
                <span>STEP 01</span>
                <h1>자기소개서 및 포트폴리오(프로젝트 3개 이상) 제출</h1>
                <p>상시 모집</p>
              </StepDescription>
            </Step>
            <Step>
              <StepImage>
                <img src={"/image/home/process/Siren.svg"} alt="step2" />
              </StepImage>
              <StepDescription>
                <span>STEP 02</span>
                <h1>개발자 회원 합격자 발표</h1>
                <p>상시 모집</p>
              </StepDescription>
            </Step>
            <Step>
              <StepImage>
                <img src={"/image/home/process/People.svg"} alt="step2" />
              </StepImage>
              <StepDescription>
                <span>STEP 03</span>
                <h1>전체 신입회원 오리엔테이션</h1>
                <p>상시 모집</p>
              </StepDescription>
            </Step>
          </InnerBottom>
        </TextArea>
      )}
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  padding: 9rem 0;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 4.2rem;
`;

const ImageArea = styled.div`
  width: 10.5rem;
  height: 10.5rem;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const InnerTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  h1 {
    color: #c8604e;
    font-size: 2.6rem;
    font-weight: 800;
    line-height: 160%; /* 4.16rem */
  }

  p {
    color: #525252;
    font-size: 2rem;
    font-weight: 600;
    line-height: 150%; /* 3.0rem */
    span {
      color: #aa4533;
    }
  }
`;

const TopDescription = styled.ul`
  padding-left: 1em;
  li {
    color: #666259;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 185%; /* 3.3299999999999996rem */
    list-style: disc outside;
    word-break: keep-all;
    span {
      font-weight: 600;
    }
  }
`;

const InnerBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  h1 {
    color: #3b3b3b;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 180%; /* 3.6rem */
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4.8rem;
`;

const StepImage = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
`;

const StepDescription = styled.div`
  span {
    color: #f0745f;
    font-size: 1.2rem;
    font-weight: 500;
  }

  h1 {
    position: relative;
    top: 0.3rem;
  }

  p {
    color: #827a68;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 150%; /* 2.4rem */
    letter-spacing: 0.064rem;
  }
`;
