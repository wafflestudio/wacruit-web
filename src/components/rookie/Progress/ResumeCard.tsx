import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import asset from "./progressCardAsset";

type ResumeCardProps = {
  submit: boolean;
};

export function ResumeCard({ submit }: ResumeCardProps) {
  const navigate = useNavigate();
  const { iconSrc, iconAlt, description } = useMemo(
    () => (submit ? asset.resumeSubmit : asset.resumeNotSubmit),
    [submit],
  );

  return (
    <Card $submit={submit} onClick={() => navigate("./resume")}>
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
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  border: ${(props) =>
    props.$submit ? "0.1rem solid #64CB3F" : "0.1rem solid #D1D1D1"};
  background: "#fff";

  &:hover {
    background: "#f6f6f6";
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
