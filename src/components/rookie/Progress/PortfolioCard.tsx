import styled from "styled-components";

type PortfolioCardProps = {
  submit: boolean;
};

export default function PortfolioCard({ submit }: PortfolioCardProps) {
  return (
    <Card $submit={submit}>
      <InfoSection>
        <Name>포트폴리오</Name>
        <Description>{}</Description>
      </InfoSection>
    </Card>
  );
}

const Card = styled.li<{
  $submit: boolean;
}>`
  position: relative;
  display: flex;
  width: 280px;
  height: 193px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  padding: 27px;
  cursor: pointer;
  color: ${(props) => (props.$submit ? "#F0745F" : "#64CB3F")};
  border: "1px solid #D1D1D1";
  background: "#fff";
  &:hover {
    background: "#f6f6f6";
  }
`;

const InfoSection = styled.div``;

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
