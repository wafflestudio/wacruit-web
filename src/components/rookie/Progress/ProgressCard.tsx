import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import asset from "./progressCardAsset";
import { ProblemStatusCode } from "../../../types/apiTypes";

type ProgressCardProps = {
  title: string;
  statusCode: number;
  to: string;
};

export function ProgressCard({ title, statusCode, to }: ProgressCardProps) {
  const navigate = useNavigate();
  const { iconSrc, iconAlt, theme, description } = useMemo(() => {
    switch (statusCode) {
      case ProblemStatusCode.NOT_SUBMITTED:
        return asset.problemNotSubmit;
      case ProblemStatusCode.JUDGING:
        return asset.problemJudging;
      case ProblemStatusCode.CORRECT:
        return asset.problemSubmitCorrect;
      case ProblemStatusCode.WRONG:
        return asset.problemSubmitWrong;
      default:
        return asset.problemNotSubmit;
    }
  }, [statusCode]);

  return (
    <Card $theme={theme} onClick={() => navigate(to)}>
      <img src={iconSrc} alt={iconAlt} />
      <Name>{title}</Name>
      <Description>{description}</Description>
      <Button>
        <img src={"/icon/rookie/CardRightArrow.svg"} width={24} />
      </Button>
    </Card>
  );
}

const Card = styled.li<{
  $theme: "red" | "green" | "yellow" | "gray";
}>`
  position: relative;
  box-sizing: border-box;
  width: 28rem;
  height: 19.3rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.1rem solid #d1d1d1;
  padding: 2.7rem;
  cursor: pointer;
  color: ${(props) =>
    props.$theme === "green"
      ? "#45B61D"
      : props.$theme === "red"
      ? "#F0745F"
      : props.$theme === "gray"
      ? "#737373"
      : props.$theme === "yellow"
      ? "#FFB800"
      : "black"};
  border: ${(props) =>
    props.$theme === "green"
      ? "0.1rem solid #60BF3E"
      : props.$theme === "red"
      ? "0.1rem solid #F0745F"
      : props.$theme === "yellow"
      ? "0.1rem solid #FFB800"
      : "0.1rem solid #D1D1D1"};
  background: ${(props) =>
    props.$theme === "green"
      ? "linear-gradient(180deg, #DBFFCE 0%, #FFF 46.88%);"
      : props.$theme === "red"
      ? "linear-gradient(180deg, #FFDED9 0%, #FFF 46.88%);"
      : props.$theme === "yellow"
      ? "linear-gradient(180deg, #FFF7CE 0%, #FFF 46.88%);"
      : "#fff"};

  &:hover {
    background: ${(props) =>
      props.$theme === "green"
        ? "linear-gradient(180deg, #DBFFCE 0%, #F6F6F6 46.88%);"
        : props.$theme === "red"
        ? "linear-gradient(180deg, #FFDED9 0%, #F6F6F6 46.88%);"
        : props.$theme === "yellow"
        ? "linear-gradient(180deg, #FFF7CE 0%, #F6F6F6 46.88%);"
        : "#f6f6f6"};
  }
`;

const Name = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  margin-top: 1.6rem;
  margin-bottom: 0.7rem;
`;

const Description = styled.p`
  color: #737373;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 160%; /* 2.2399999999999998rem */
  letter-spacing: 0.05600000000000001rem;
  margin: 0;
`;

const Button = styled.button`
  position: absolute;
  width: 3rem;
  height: 3rem;
  padding: 0.2rem 0 0 0;
  border-radius: 50%;
  border: 0.1rem solid #737373;
  right: 2.7rem;
  bottom: 2.7rem;
  background: none;
`;
