import styled from "styled-components";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { HeaderOffset } from "../components/project";
import { getProjectDetail } from "../apis/project";
import type { ProjectUrl } from "../shared/api/types/project";
import { useRouteNavigation } from "../shared/routes/useRouteNavigation";
import type { ProjectImage } from "../shared/api/types/project";

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
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.013rem;
`;

const Summary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: "Pretendard Variable";
  font-size: ${({ theme }) => theme.fontSizes[16]};
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

const ImageCard = styled.div<{ $src: string }>`
  align-self: stretch;
  height: 57.931rem;
  aspect-ratio: 58 / 35;
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.black[200]};
  background-image: ${({ $src }) => `url("${$src}")`};
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 767px) {
    height: 21.3017rem;
  }
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: "Pretendard Variable";
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.016rem;
  white-space: pre-line;

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

const labelFromUrlType = (t: string) =>
  t === "ANDROID_STORE"
    ? "Android"
    : t === "IOS_APP_STORE"
    ? "iOS"
    : t === "WEB"
    ? "Web"
    : t === "GITHUB_ANDROID"
    ? "Github: Android"
    : t === "GITHUB_IOS"
    ? "Github: iOS"
    : t === "GITHUB_WEB"
    ? "Github: Web"
    : t;

const URL_ORDER = [
  "ANDROID_STORE",
  "IOS_APP_STORE",
  "WEB",
  "GITHUB_ANDROID",
  "GITHUB_IOS",
  "GITHUB_WEB",
];

export default function ProjectDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const enabled = !!id;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectDetail(id as string),
    enabled,
  });

  const { toProjectList } = useRouteNavigation();
  const handleCloseBar = () => toProjectList();

  const sortedUrls: ProjectUrl[] = useMemo(() => {
    if (!data) return [];
    return [...data.urls].sort((a, b) => {
      const ai = URL_ORDER.indexOf(a.url_type);
      const bi = URL_ORDER.indexOf(b.url_type);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [data]);

  const imageList = useMemo<ProjectImage[]>(
    () =>
      (data?.images ?? []).filter(
        (img) =>
          typeof img.presigned_url === "string" && img.presigned_url.length > 0,
      ),
    [data],
  );

  const getStatusLabel = (t: string) =>
    t === "SERVICE" ? "서비스중" : "활동중";

  return (
    <>
      <Headerv2 />
      <Page>
        <HeaderOffset />

        <Main>
          {!enabled ? (
            <div style={{ color: "#fff" }}>잘못된 경로입니다.</div>
          ) : enabled && isFetching && !data ? (
            <div style={{ color: "#fff" }}>로딩 중…</div>
          ) : isError ? (
            <div style={{ color: "salmon" }}>
              {error instanceof Error
                ? error.message
                : "프로젝트 상세를 불러오지 못했습니다."}
            </div>
          ) : data ? (
            <>
              <InfoStack>
                <TextStack>
                  <TitleRow>
                    <Title>{data.name}</Title>
                    {data.is_active && (
                      <StatusPill>
                        {getStatusLabel(data.project_type)}
                      </StatusPill>
                    )}
                  </TitleRow>
                  <Summary>{data.summary}</Summary>
                </TextStack>

                <UrlList>
                  {sortedUrls.map((u) => (
                    <UrlPill
                      key={`${u.url_type}-${u.url}`}
                      href={u.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {labelFromUrlType(u.url_type)}
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
                {imageList.map((img) => (
                  <ImageCard
                    key={img.project_image_id}
                    $src={img.presigned_url}
                  />
                ))}
              </ImagesList>

              <Intro>{data.introduction}</Intro>
            </>
          ) : null}
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
