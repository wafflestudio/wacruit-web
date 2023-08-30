import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { RuleSet } from "styled-components";
import asset from "./progressCardAsset";
import { usePageAnimation } from "../../../lib/animatedTransition/hooks/usePageAnimation";
import { progressCardAnimator } from "../../../pages/Dashboard/dashboardAnimation";

type ResumeCardProps = {
  submit: boolean;
};

export function ResumeCard({ submit }: ResumeCardProps) {
  const navigate = useNavigate();
  const animation = usePageAnimation(progressCardAnimator(0));

  const { iconSrc, iconAlt, description } = useMemo(
    () => (submit ? asset.resumeSubmit : asset.resumeNotSubmit),
    [submit],
  );

  return (
    <Card
      $submit={submit}
      $transitionAnimation={animation}
      onClick={() => navigate("./resume")}
    >
      <img src={iconSrc} alt={iconAlt} />
      <Name>자기소개서</Name>
      <Description>{description}</Description>
      <Button>
        <img src={"/icon/rookie/CardRightArrow.svg"} width={24} />
      </Button>
    </Card>
  );
}

const Card = styled.li<{
  $submit: boolean;
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
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  border: ${(props) =>
    props.$submit ? "1px solid #64CB3F" : "1px solid #D1D1D1"};
  background: "#fff";

  &:hover {
    background: "#f6f6f6";
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
