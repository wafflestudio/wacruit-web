import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RuleSet, styled } from "styled-components";
import asset from "./progressCardAsset";
import { usePageAnimation } from "../../../lib/animatedTransition/hooks/usePageAnimation";
import { progressCardAnimator } from "../../../pages/Dashboard/dashboardAnimation";

type ProgressCardProps = {
  title: string;
  statusCode: number;
  to: string;
  animationIndex: number;
};

export function ProgressCard({
  title,
  statusCode,
  to,
  animationIndex,
}: ProgressCardProps) {
  const navigate = useNavigate();
  const animation = usePageAnimation(progressCardAnimator(animationIndex));
  const { iconSrc, iconAlt, theme, description } = useMemo(() => {
    switch (statusCode) {
      case 0:
        return asset.problemNotSubmit;
      case 1:
        return asset.problemJudging;
      case 2:
        return asset.problemSubmitCorrect;
      case 3:
        return asset.problemSubmitNotCorrect;
      default:
        return asset.problemNotSubmit;
    }
  }, [statusCode]);

  return (
    <Card
      $theme={theme}
      onClick={() => navigate(to)}
      style={{ animationDelay: `${animationIndex / 10}s` }}
      $transitionAnimation={animation}
    >
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
  $transitionAnimation: RuleSet;
}>`
  position: relative;
  box-sizing: border-box;
  width: 280px;
  height: 193px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  padding: 27px;
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
      ? "1px solid #60BF3E"
      : props.$theme === "red"
      ? "1px solid #F0745F"
      : props.$theme === "yellow"
      ? "1px solid #FFB800"
      : "1px solid #D1D1D1"};
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
  ${(props) => props.$transitionAnimation}
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 7px;
`;

const Description = styled.p`
  color: #737373;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: 0.56px;
  margin: 0;
`;

const Button = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 2px 0 0 0;
  border-radius: 50%;
  border: 1px solid #737373;
  right: 27px;
  bottom: 27px;
  background: none;
`;
