import styled from "styled-components";
import asset from "./progressCardAsset";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioFiles, getPortfolioLinks } from "../../../apis/portfolio";

type PortfolioCardProps = {
  submit: boolean;
};

export default function PortfolioCard({ submit }: PortfolioCardProps) {
  const { description, iconSrc, iconAlt } = useMemo(
    () => (submit ? asset.portfolioSubmit : asset.portfolioNotSubmit),
    [submit],
  );

  const { data: files } = useQuery({
    queryKey: ["portfolio", "files"],
    queryFn: () => getPortfolioFiles(),
    staleTime: Infinity,
  });
  const { data: links } = useQuery({
    queryKey: ["portfolio", "links"],
    queryFn: () => getPortfolioLinks(),
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log(files);
    console.log(links);
  }, [files, links]);

  return (
    <Card $submit={submit}>
      <InfoSection>
        <img src={iconSrc} alt={iconAlt} />
        <Name>포트폴리오</Name>
        <Description>{description}</Description>
      </InfoSection>
      <FileSection>
        <div>파일 첨부</div>
        <FileInputButton htmlFor="portfolio">파일 선택</FileInputButton>
        <FileInput type="file" id="portfolio" />
      </FileSection>
      <LinkSection>
        <div>링크 첨부</div>
        <LinkInput placeholder="https://example.com" />
        <LinkInput placeholder="https://example.com" />
      </LinkSection>
    </Card>
  );
}

const Card = styled.li<{
  $submit: boolean;
}>`
  position: relative;
  display: flex;
  width: 840px;
  height: 193px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  padding: 27px;
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  border: "1px solid #D1D1D1";
  background: "#fff";
  gap: 14px;
  &:hover {
    background: "#f6f6f6";
  }
`;

const InfoSection = styled.div`
  width: 266px;
`;

const FileSection = styled.div`
  width: 237px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #f6f6f6;
  gap: 8px;
  color: #404040;
`;

const FileInputButton = styled.label`
  padding: 7px 12px;
  gap: 10px;
  border-radius: 5px;
  background: #f0745f;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
  cursor: pointer;
`;
const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  padding: 0;
  border: 0;
`;

const LinkSection = styled.div`
  width: 237px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: #404040;
`;

const LinkInput = styled.input`
  width: 260px;
  padding: 7px 12px;
  color: #404040;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
  border: none;
  border-radius: 5px;
  background: #f6f6f6;

  &::placeholder {
    color: #d9d9d9;
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
