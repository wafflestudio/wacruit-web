import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./common";
import { useCallback, useState } from "react";
import { LockIcon } from "./icons/LockIcon";
import CalenderInner from "./CalenderInner";
import { useQuery } from "@tanstack/react-query";
import { zIndex } from "../../lib/zIndex";
import { getAllRecruitings } from "../../apis/recruiting";
import { useNavigate } from "react-router-dom";
import { checkAuth, tryLogin } from "../../apis/auth";

export default function Apply() {
  const navigate = useNavigate();
  const [field, setField] = useState<"ROOKIE" | "DESIGNER" | "PROGRAMMER">(
    "ROOKIE",
  );
  const { status, data } = useQuery({
    queryKey: ["recruiting"],
    queryFn: getAllRecruitings,
    staleTime: 1000 * 60,
    retry: 3,
  });

  const onApply = useCallback(async (recruit_id: number) => {
    /**
     * @TODO authPing으로 교체
     */
    const auth = await checkAuth();

    if (auth === "valid") {
      navigate(`/recruiting/${recruit_id}`);
      return;
    }
    if (auth === "need_register") {
      navigate(`/sso/${recruit_id}`);
    }
    if (auth === "invalid") {
      tryLogin(recruit_id);
    }
  }, []);

  return (
    <Section>
      <BackGround></BackGround>
      <SectionNumber>#4</SectionNumber>
      <SectionTitle>
        <h1>
          와플스튜디오 <span>지원하기</span>
        </h1>
        <p>와플스튜디오의 각 회원별 모집 일정 및 지원 방법입니다.</p>
      </SectionTitle>
      <ApplyCalender>
        <SelectField>
          <Select
            $active={field === "ROOKIE"}
            $isLock={false}
            onClick={() => setField("ROOKIE")}
          >
            루키(ROOKIE)
          </Select>
          <Select
            $active={field === "DESIGNER"}
            $isLock={false}
            onClick={() => setField("DESIGNER")}
          >
            디자이너(DESIGNER)
          </Select>
          <Select $active={field === "PROGRAMMER"} $isLock={true}>
            <LockIcon width={21} height={23} />
            개발자(PROGRAMMER)
          </Select>
        </SelectField>
        <CalenderArea>
          <DayWeek>
            <p>S</p>
            <p>M</p>
            <p>T</p>
            <p>W</p>
            <p>T</p>
            <p>F</p>
            <p>S</p>
          </DayWeek>
          <img src={"/image/home/Stroke.svg"} />
          <CalenderInner select={field}></CalenderInner>
          <ApplyButton>
            <p>
              {status !== "loading" && status === "success" && (
                <span>
                  {field === "ROOKIE"
                    ? data?.items[0].applicant_count
                    : data?.items[1].applicant_count}
                </span>
              )}
              명 지원 중
            </p>
            <button onClick={() => onApply(field === "ROOKIE" ? 1 : 2)}>
              지원하러가기!
            </button>
          </ApplyButton>
        </CalenderArea>
      </ApplyCalender>
      <Share>
        <ShareText>
          <h1>
            와플스튜디오 <br /> <span>리크루팅</span> 공유하기
          </h1>
          <p>와플스튜디오 루키회원 모집을 주변에 소문내주세요! </p>
        </ShareText>
        <ShareButton>
          <ShareIcon>
            <img src={"/image/home/share/Instagram.svg"} alt="share" />
          </ShareIcon>
          <ShareIcon>
            <img src={"/image/home/share/Share.svg"} alt="share" />
          </ShareIcon>
          <ShareIcon>
            <img src={"/image/home/share/KakaoTalk.svg"} alt="share" />
          </ShareIcon>
        </ShareButton>
      </Share>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #fffcf5;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.background};
`;

const ApplyCalender = styled.div`
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
`;

const SelectField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Select = styled.div<{ $active: boolean; $isLock: boolean }>`
  padding: 30px 0px;
  flex: 1;
  border-radius: 15px 15px 0px 0px;
  text-align: center;
  font-family: Jalnan;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.66px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  cursor: ${(props) => (props.$isLock ? "not-allowed" : "pointer")};

  background: ${(props) => (props.$active ? "#f0745f" : "#EDE5D1")};
  color: ${(props) => (props.$active ? "#fff" : "#B7B1A2")};

  transition: all 0.15s ease-in-out;
`;

const CalenderArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 70px 70px;
  border-radius: 0px 0px 20px 20px;
  background: #fff7e5;
  align-items: center;
`;

const DayWeek = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 56px 0px 38px;

  p {
    color: #756643;
    font-family: "Fredoka One";
    font-size: 30px;
    font-weight: 600;
    line-height: 170%; /* 51px */
    letter-spacing: 1.2px;
  }

  p:nth-child(1) {
    color: #f0745f;
  }
`;

const ApplyButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  align-items: center;

  p {
    color: #434343;
    font-size: 16px;
    font-weight: 600;
    span {
      color: #f0745f;
      font-family: Jalnan;
      font-size: 24px;
      font-weight: 700;
    }
  }

  button {
    height: 70px;
    width: 396px;

    border: none;
    border-radius: 20px;
    background: #f0745f;

    color: #fff;
    font-family: Jalnan;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.88px;

    cursor: pointer;
  }
`;

const Share = styled.div`
  margin-top: 126px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ShareText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    color: #434343;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 140%; /* 42px */
    span {
      color: #f0745f;
      font-family: Jalnan;
    }
  }
  p {
    color: #837c6d;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
  }
`;

const ShareButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 42px;
`;
const ShareIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #f0745f;
  cursor: pointer;
`;
