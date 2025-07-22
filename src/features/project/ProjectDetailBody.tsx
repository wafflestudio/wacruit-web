// api 연결시: import { useParams } from "react-router-dom"
import styled from "styled-components";
import { projectDetail, type UrlItem, type UrlType } from "../../mocks/project";
import { useState } from "react";

export default function ProjectDetailPage() {
  const [index, setIndex] = useState(0);
  const project = projectDetail;

  function getStatusLabel(a: string): string {
    return a === "SERVICE" ? "서비스 중" : "활동 중";
  }

  const LABEL_ORDER: UrlType[] = [
    "Android",
    "iOS",
    "Web",
    "Github: Android",
    "Github: iOS",
    "Github: Web",
  ];

  const sortedUrls = LABEL_ORDER.map((title) =>
    project.urls.find((url) => url.title === title),
  ).filter((url): url is UrlItem => url !== undefined);

  return (
    <Container>
      <Column>
        <Row>
          <Title>{project.name}</Title>
          {project.is_active && (
            <Status>{getStatusLabel(project.project_type)}</Status>
          )}
        </Row>
        <Text>{project.summary}</Text>
        <Row>
          {sortedUrls.map((url) => (
            <Label key={url.title} href={url.url} target="_blank">
              {url.title}
              <StyledArrow
                src="/icon/arrow_outward.svg"
                onClick={() => setIndex((i) => i + 1)}
                $disabled={index === project.images.length - 1}
              />
            </Label>
          ))}
        </Row>
      </Column>
      <ImageWrapper>
        <ArrowButton
          left
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
        >
          <Icon src="/icon/forward_left.svg" alt="뒤로가기" />
        </ArrowButton>

        <Image src={project.images[index]} alt={`project image ${index + 1}`} />

        <ArrowButton
          onClick={() => setIndex((i) => i + 1)}
          disabled={index === project.images.length - 1}
        >
          <Icon src="/icon/forward_right.svg" alt="앞으로가기" />
        </ArrowButton>
      </ImageWrapper>
      <Text>{project.introduction}</Text>
    </Container>
  );
}

const Icon = styled.img`
  margin: 0;
  padding: 0;
  display: block;
`;

const StyledArrow = styled.img<{ $disabled: boolean }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
`;
const Title = styled.h1`
  color: var(--white, #fff);
  /* 32/Bold */
  font-family: "Pretendard Variable";
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
`;

const Text = styled.div`
  color: var(--white, #fff);
  /* 16/Medium */
  font-family: "Pretendard Variable";
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
`;
const Container = styled.div`
  background-color: #000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 13rem;
  align-items: flex-start;
  gap: 4rem;
  align-self: stretch;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
`;
const Column = styled(Row)`
  && {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.a`
  background: white;
  color: black;
  padding: 0.6rem 0.8rem 0.6rem 1.2rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  font-family: "Pretendard Variable";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;

const Status = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 0.375rem;
  background: #dfffa3;
  color: #111;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  color: var(--black-900, #121212);
  /* 13/Medium */
  font-family: "Pretendard Variable";
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.13px;
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
  padding: 0.25rem;
  cursor: pointer;
  filter: brightness(0) invert(1);

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
