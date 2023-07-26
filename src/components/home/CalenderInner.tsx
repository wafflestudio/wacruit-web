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
            style={{ width: "100%", height: "100%" }}
            src={"/image/home/members/Rookie.svg"}
            alt="rookie"
          />
        )}
        {select === "DESIGNER" && (
          <img
            style={{ width: "100%", height: "100%" }}
            src={"/image/home/members/Designer.svg"}
            alt="rookie"
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
                <p>8월 13일(일) 23:59시까지 위 사항을 완료해주셔야 합니다.</p>
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
                  합격자 발표는 8월 18일(금) 리쿠르팅 사이트로 공개될
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
                <p>
                  8월 20일(일) 비대면으로 진행되며, 시간은 추후 공지될
                  예정입니다.
                </p>
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
                <span>Adobe XD, Sketch, Figma</span> 등의 툴을 사용해본 경험이
                있거나, <span>UI/UX Design에 열정과 관심</span>이 있는 분들을
                찾습니다.
              </li>
              <li>
                Figma 사용 경험이 많지 않으신 분들 한해서{" "}
                <span>피그마 스터디</span>도 함께 진행할 예정입니다.
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
                <p>8월 13일(일) 23:59시까지 위 사항을 완료해주셔야 합니다..</p>
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
                  합격자 발표는 8월 18일(금) 리쿠르팅 사이트로 공개될
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
                <p>
                  8월 20일(일) 비대면으로 진행되며, 시간은 추후 공지될
                  예정입니다.
                </p>
              </StepDescription>
            </Step>
          </InnerBottom>
        </TextArea>
      )}
    </Section>
  );
}

const Section = styled.section`
  padding: 90px 0;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 42px;
`;

const ImageArea = styled.div`
  width: 105px;
  height: 105px;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const InnerTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  h1 {
    color: #c8604e;
    font-size: 26px;
    font-weight: 800;
    line-height: 160%; /* 41.6px */
  }

  p {
    color: #525252;
    font-size: 20px;
    font-weight: 600;
    line-height: 150%; /* 30px */
    span {
      color: #aa4533;
    }
  }
`;

const TopDescription = styled.ul`
  li {
    color: #666259;
    font-size: 18px;
    font-weight: 400;
    line-height: 185%; /* 33.3px */
    span {
      font-weight: 600;
    }
  }

  li:before {
    content: "•";
    margin-right: 10px;
  }
`;

const InnerBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  h1 {
    color: #3b3b3b;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 180%; /* 36px */
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

const StepImage = styled.div`
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
`;

const StepDescription = styled.div`
  span {
    color: #f0745f;
    font-size: 12px;
    font-weight: 500;
  }

  h1 {
    position: relative;
    top: 3px;
  }

  p {
    color: #827a68;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: 0.64px;
  }
`;
