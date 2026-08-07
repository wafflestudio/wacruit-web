import { useMemo } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import asset from "./progressCardAsset";
import { ProblemStatusCode } from "../../../apis/recruiting/recruiting.types";

type ProgressCardProps = {
  title: string;
  statusCode: number;
  to: string;
};

export function ProgressCard({ title, statusCode, to }: ProgressCardProps) {
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
    <Item>
      <Card $theme={theme} to={to}>
        <img src={iconSrc} alt={iconAlt} />
        <Name>{title}</Name>
        <Description>{description}</Description>
        <Arrow aria-hidden="true">
          <img src="/icon/rookie/CardRightArrow.svg" alt="" width={24} />
        </Arrow>
      </Card>
    </Item>
  );
}

const Item = styled.li`
  display: flex;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Card = styled(Link)<{
  $theme: "red" | "green" | "yellow" | "gray";
}>`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 28rem;
  height: 19.3rem;
  border-radius: 0.5rem;
  padding: 2.7rem;
  cursor: pointer;
  text-decoration: none;
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

  &:focus-visible {
    outline: 0.3rem solid #f0745f;
    outline-offset: 0.3rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Name = styled.h3`
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

const Arrow = styled.span`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.1rem solid #737373;
  right: 2.7rem;
  bottom: 2.7rem;
`;
