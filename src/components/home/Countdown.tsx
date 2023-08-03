import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "./Countdown.css";

export default function Countdown() {
  return (
    <div>
      <FlipClockCountdown
        to={new Date("2023-08-04T12:00:00")}
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
