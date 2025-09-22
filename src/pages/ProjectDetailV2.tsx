import styled from "styled-components";
import { projectDetail, type UrlItem, type UrlType } from "../mocks/project";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { HeaderOffset } from "../components/project";

const Page = styled.div`
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Main = styled.main`
  display: flex;
  max-width: 100rem;
  padding: 0 2rem 14rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
  align-self: stretch;
  margin: 0 auto;
`;

const TextStack = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.8rem;
  align-self: stretch;
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.5;
`;

const StatusPill = styled.span`
  display: flex;
  padding: 0.3rem 0.8rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.lime};

  color: ${({ theme }) => theme.colors.black[900]};
  font-family: "Pretendard Variable";
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.013rem;
`;

const Summary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};

  font-family: "Pretendard Variable";
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.016rem;

  @media (max-width: 767px) {
    font-size: 1.5rem;
    letter-spacing: -0.015rem;
  }
`;

const UrlList = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.8rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

const UrlPill = styled.a`
  display: flex;
  padding: 0.6rem 0.8rem 0.6rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
`;

const LinkArrowImg = styled.img`
  width: 2rem;
  height: 2rem;
  display: block;
`;

const ImagesList = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Image = styled.div<{ $src: string }>`
  align-self: stretch;
  height: 57.931rem;
  aspect-ratio: 58 / 35;
  border-radius: 0.8rem;
  background: ${({ $src, theme }) =>
    `url(${$src}) lightgray 50% / cover no-repeat, ${theme.colors.black[200]}`};

  @media (max-width: 767px) {
    height: 21.3017rem;
  }
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};

  font-family: "Pretendard Variable";
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.016rem;

  @media (max-width: 767px) {
    font-size: 1.5rem;
    letter-spacing: -0.015rem;
  }
`;

const GreenBar = styled.button`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5rem;
  background: ${({ theme }) => theme.colors.green};
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  padding: 0.5rem 0;
  cursor: pointer;
`;

const CloseImg = styled.img`
  width: 4rem;
  height: 4rem;
  display: block;
`;

export default function ProjectDetailPageV2() {
  const project = projectDetail;

  const handleCloseBar = () => {
    window.location.assign("/projects");
  };

  function getStatusLabel(a: string): string {
    return a === "SERVICE" ? "서비스중" : "활동중";
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
    <>
      <Headerv2 />
      <Page>
        <HeaderOffset />

        <Main>
          <InfoStack>
            <TextStack>
              <TitleRow>
                <Title>{project.name}</Title>
                {project.is_active && (
                  <StatusPill>
                    {getStatusLabel(project.project_type)}
                  </StatusPill>
                )}
              </TitleRow>

              <Summary>{project.summary}</Summary>
            </TextStack>

            <UrlList>
              {sortedUrls.map((url) => (
                <UrlPill
                  key={url.title}
                  href={url.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {url.title}
                  <LinkArrowImg
                    src="/icon/LinkArrow.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </UrlPill>
              ))}
            </UrlList>
          </InfoStack>

          <ImagesList>
            {project.images.map((src, i) => (
              <Image
                key={i}
                $src={src}
                role="img"
                aria-label={`project image ${i + 1}`}
              />
            ))}
          </ImagesList>

          <Intro>{project.introduction}</Intro>
        </Main>

        <GreenBar
          onClick={handleCloseBar}
          aria-label="프로젝트 목록으로 돌아가기"
        >
          <CloseImg src="/icon/Close.svg" alt="닫기" />
        </GreenBar>
      </Page>
    </>
  );
}
