import styled from "styled-components";
import { SectionNumber, SectionTitle } from "./style";
import { useState } from "react";
import { LockIcon } from "../../../public/image/LockIcon";
import { Stroke } from "../../../public/image/Stroke";
import CalenderInner from "./CalenderInner";

export default function Apply() {
  const [field, setField] = useState("ROOKIE");

  return (
    <Section>
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
            active={field === "ROOKIE"}
            isLock={false}
            onClick={() => setField("ROOKIE")}
          >
            루키(ROOKIE)
          </Select>
          <Select
            active={field === "DESIGNER"}
            isLock={false}
            onClick={() => setField("DESIGNER")}
          >
            디자이너(DESIGNER)
          </Select>
          <Select active={field === "PROGRAMMER"} isLock={true}>
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
          <Stroke />
          <CalenderInner></CalenderInner>
          <ApplyButton>
            <p>
              <span>NN</span>명 지원 중
            </p>
            <button>지원하러가기!</button>
          </ApplyButton>
        </CalenderArea>
      </ApplyCalender>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  background: #fffcf5;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Select = styled.div<{ active: boolean; isLock: boolean }>`
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

  cursor: ${(props) => (props.isLock ? "not-allowed" : "pointer")};

  background: ${(props) => (props.active ? "#f0745f" : "#EDE5D1")};
  color: ${(props) => (props.active ? "#fff" : "#B7B1A2")};

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
