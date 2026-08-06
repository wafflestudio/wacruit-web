import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import asset from "./progressCardAsset";

type ResumeCardProps = {
  submit: boolean;
};

export function ResumeCard({ submit }: ResumeCardProps) {
  const { iconSrc, iconAlt, description } = useMemo(
    () => (submit ? asset.resumeSubmit : asset.resumeNotSubmit),
    [submit],
  );

  return (
    <Item>
      <Card $submit={submit} to="./resume">
        <img src={iconSrc} alt={iconAlt} />
        <Name>자기소개서</Name>
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
  $submit: boolean;
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
  background: #fff;
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  border: ${(props) =>
    props.$submit ? "0.1rem solid #64CB3F" : "0.1rem solid #D1D1D1"};

  &:hover {
    background: #f6f6f6;
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
