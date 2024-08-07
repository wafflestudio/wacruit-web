import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./common";
import { useCallback, useState } from "react";
import CalenderInner from "./CalenderInner";
// import { useQuery } from "@tanstack/react-query";
import { zIndex } from "../../lib/zIndex";
// import { getAllRecruitings } from "../../apis/recruiting";
import { useNavigate } from "react-router-dom";

export default function Apply() {
  const navigate = useNavigate();
  const [field, setField] = useState<"ROOKIE" | "DESIGNER" | "PROGRAMMER">(
    "ROOKIE",
  );
  // const { status, data } = useQuery({
  //   queryKey: ["recruiting"],
  //   queryFn: getAllRecruitings,
  //   staleTime: 1000 * 60,
  //   retry: 3,
  // });

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
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
          <Select
            $active={field === "PROGRAMMER"}
            $isLock={true}
            // onClick={() => setField("PROGRAMMER")}
          >
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
            {/* FIXME 어떤 리크루팅의 지원자 수를 적어야할지 모르겠어서 일단 주석 처리... */}
            {/* <p>
              {status !== "loading" && status === "success" && (
                <span>
                  {field === "ROOKIE"
                    ? data?.items[0].applicant_count
                    : data?.items[1].applicant_count}
                </span>
              )}
              명 지원 중
            </p> */}
            <button onClick={() => navigate("/recruiting")}>
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
          <ShareIcon
            onClick={() => {
              window.open("https://www.instagram.com/wafflestudio_official/");
            }}
          >
            <img src={"/image/home/share/Instagram.svg"} alt="share" />
          </ShareIcon>
          <ShareIcon onClick={onCopy}>
            <img src={"/image/home/share/Share.svg"} alt="share" />
          </ShareIcon>
        </ShareButton>
      </Share>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 10rem 0;
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
  max-width: 130rem;
  display: flex;
  flex-direction: column;
`;

const SelectField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Select = styled.div<{ $active: boolean; $isLock: boolean }>`
  padding: 3rem 0rem;
  flex: 1;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
  text-align: center;
  font-family: Jalnan;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.066rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  cursor: ${(props) => (props.$isLock ? "not-allowed" : "pointer")};

  background: ${({ $active }) => ($active ? "#f0745f" : "#EDE5D1")};
  color: ${({ $active }) => ($active ? "#fff" : "#B7B1A2")};

  transition: all 0.15s ease-in-out;
`;

const CalenderArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0rem 15rem 7rem;
  border-radius: 0rem 0rem 2rem 2rem;
  background: #fff7e5;
  justify-content: start;
  align-items: center;
`;

const DayWeek = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5.6rem 1rem 3.8rem;

  p {
    color: #756643;
    font-family: "Fredoka One";
    font-size: 3rem;
    font-weight: 600;
    line-height: 170%; /* 5.1rem */
    letter-spacing: 0.12rem;
  }

  p:nth-child(1) {
    color: #f0745f;
  }
`;

const ApplyButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  align-items: center;

  p {
    color: #434343;
    font-size: 1.6rem;
    font-weight: 600;
    span {
      color: #f0745f;
      font-family: Jalnan;
      font-size: 2.4rem;
      font-weight: 700;
    }
  }

  button {
    height: 7rem;
    width: 39.6rem;

    border: none;
    border-radius: 2rem;
    background: #f0745f;

    color: #fff;
    font-family: Jalnan;
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: 0.088rem;

    cursor: pointer;
  }
`;

const Share = styled.div`
  margin-top: 12.6rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ShareText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    color: #434343;
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    line-height: 140%; /* 4.2rem */
    span {
      color: #f0745f;
      font-family: Jalnan;
    }
  }
  p {
    color: #837c6d;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%; /* 2.52rem */
  }
`;

const ShareButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4.2rem;
`;
const ShareIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.8rem;
  height: 6.8rem;
  border-radius: 50%;
  background: #f0745f;
  cursor: pointer;
`;
