import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "./Countdown.css";
import styled from "styled-components";

function PausedCard() {
  return (
    <Card>
      <NumberTop>0</NumberTop>
      <NumberBottom>0</NumberBottom>
    </Card>
  );
}

export function PausedCountdown() {
  return (
    <Container>
      <PausedCard />
      <PausedCard />
      <Colon />
      <PausedCard />
      <PausedCard />
      <Colon />
      <PausedCard />
      <PausedCard />
      <Colon />
      <PausedCard />
      <PausedCard />
    </Container>
  );
}

export default function Countdown() {
  return (
    <div>
      <FlipClockCountdown
        to={new Date("2023-10-13T23:59:59")}
        digitBlockStyle={{
          width: "77px",
          height: "121px",
          fontSize: "74px",
          boxShadow: "none",
        }}
        labels={["DAY", "HOUR", "MIN", "SEC"]}
        separatorStyle={{ color: "#F0745F", size: 11 }}
        labelStyle={{ color: "#671F13", fontWeight: 600 }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  gap: 16px;
`;

const Card = styled.div`
  position: relative;
  width: 77px;
  height: 121px;
`;

const NumberTop = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  top: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: url(/image/home/countdown/CardTopHalf.svg);
  font-family: "Fredoka", cursive !important;
  font-size: 74px;
  color: white;
  line-height: 0;
  font-weight: 600;
`;

const NumberBottom = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: url(/image/home/countdown/CardBottomHalf.svg);
  font-family: "Fredoka", cursive !important;
  font-size: 74px;
  color: white;
  line-height: 0;
  font-weight: 600;
`;

const Colon = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  height: 121px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:before {
    content: "";
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #f0745f;
    margin-bottom: 11px;
  }

  &:after {
    content: "";
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #f0745f;
  }
`;
