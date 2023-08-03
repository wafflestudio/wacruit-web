import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import asset from "./progressCardAsset";

type ProgressCardProps =
  | {
      type: "resume";
      title: string;
      submit: boolean;
      correct: null;
      to: string;
    }
  | {
      type: "problem";
      title: string;
      submit: boolean;
      correct: boolean;
      to: string;
    };

export function ProgressCard({
  type,
  title,
  submit,
  correct,
  to,
}: ProgressCardProps) {
  const navigate = useNavigate();
  const { iconSrc, iconAlt, theme, description } = useMemo(() => {
    //resume
    if (type === "resume")
      return submit ? asset.resumeSubmit : asset.resumeNotSubmit;
    //problem (default)
    return submit
      ? correct
        ? asset.problemSubmitCorrect
        : asset.problemSubmitNotCorrect
      : asset.problemNotSubmit;
  }, [type, submit, correct]);

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
  $theme: "red" | "green" | "gray" | "resumeRed" | "resumeGreen";
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
      : props.$theme === "resumeGreen"
      ? "#64CB3F"
      : props.$theme === "resumeRed"
      ? "#F0745F"
      : "black"};
  border: ${(props) =>
    props.$theme === "resumeGreen"
      ? "1px solid #64CB3F"
      : props.$theme === "green"
      ? "1px solid #60BF3E"
      : props.$theme === "red"
      ? "1px solid #F0745F"
      : "1px solid #D1D1D1"};
  background: ${(props) =>
    props.$theme === "green"
      ? "linear-gradient(180deg, #DBFFCE 0%, #FFF 46.88%);"
      : props.$theme === "red"
      ? "linear-gradient(180deg, #FFDED9 0%, #FFF 46.88%);"
      : "#fff"};

  &:hover {
    background: ${(props) =>
      props.$theme === "green"
        ? "linear-gradient(180deg, #DBFFCE 0%, #F6F6F6 46.88%);"
        : props.$theme === "red"
        ? "linear-gradient(180deg, #FFDED9 0%, #F6F6F6 46.88%);"
        : "#f6f6f6"};
  }
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
  padding: 2.5px;
  border-radius: 50%;
  border: 1px solid #737373;
  right: 27px;
  bottom: 27px;
  background: none;
`;
