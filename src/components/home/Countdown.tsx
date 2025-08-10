import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "./Countdown.css";

export default function Countdown() {
  return (
    <div>
      <FlipClockCountdown
        to={new Date("2025-08-22T23:59:00")}
        digitBlockStyle={{
          width: "7.7rem",
          height: "12.1rem",
          fontSize: "7.4rem",
          boxShadow: "none",
        }}
        labels={["DAY", "HOUR", "MIN", "SEC"]}
        separatorStyle={{ color: "#F0745F", size: 11 }}
        labelStyle={{ color: "#671F13", fontWeight: 600 }}
      />
    </div>
  );
}
