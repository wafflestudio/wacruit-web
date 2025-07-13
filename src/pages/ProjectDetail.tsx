// api 연결시: import { useParams } from "react-router-dom"
import styled from "styled-components";
import { projectDetail, urlItem } from "../mocks/project";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useState } from "react";

const Container = styled.div`
  background-color: #000;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
`;

const Label = styled.a`
  background: white;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

const Status = styled.span`
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  background: #dfffa3;
  color: #111;
  font-weight: bold;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: auto;
  height: 50rem;
  border-radius: 1rem;
`;

const ArrowButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 0.5rem;" : "right: 0.5rem;")}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  padding: 0.25rem;
  cursor: pointer;
  color: white;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default function ProjectDetailPage() {
  const [index, setIndex] = useState(0);
  const project = projectDetail;

  const getStatusLabel = () => {
    if (!project.is_active)
      return project.project_type === "SERVICE" ? "서비스 종료" : "활동 종료";
    return project.project_type === "SERVICE" ? "서비스 중" : "활동 중";
  };

  const labelOrder = [
    "Android",
    "iOS",
    "Web",
    "Github: Android",
    "Github: iOS",
    "Github: Web",
  ];

  const sortedUrls = labelOrder
    .map((title) => project.urls.find((url) => url.title === title))
    .filter((url): url is urlItem => !!url);

  return (
    <Container>
      <Row>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{project.name}</h1>
        <Status>{getStatusLabel()}</Status>
      </Row>
      <Row>{project.summary}</Row>
      <Row>
        {sortedUrls.map((url) => (
          <Label
            key={url.title}
            href={url.url.startsWith("http") ? url.url : `https://${url.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url.title}
            <ArrowOutwardIcon />
          </Label>
        ))}
      </Row>
      <ImageWrapper>
        <ArrowButton
          left
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
        >
          <ArrowBackIosIcon />
        </ArrowButton>

        <Image src={project.images[index]} alt={`project image ${index + 1}`} />

        <ArrowButton
          onClick={() => setIndex((i) => i + 1)}
          disabled={index === project.images.length - 1}
        >
          <ArrowForwardIosIcon />
        </ArrowButton>
      </ImageWrapper>
      <Row>{project.introduction}</Row>
    </Container>
  );
}
