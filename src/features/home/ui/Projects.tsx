// features/home/ui/Projects.tsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { ProjectStatusBadge } from "../../../entities/project/ui/ProjectStatusBadge";
import { useProjectQuery } from "../../../apis/project/project.query";
import type { ProjectType } from "../../project/types";
import { ITEMS_PER_PAGE, getProjectsByType } from "../../project/utils";
import { ActivitiesCTAButton } from "../../../shared/ui/button/ActivitiesCTAButton";

export const Projects = () => {
  const navigate = useNavigate();
  const { useGetProjects } = useProjectQuery();
  const { data, isError } = useGetProjects({});

  if (isError) {
    return <div>에러 발생</div>;
  }

  if (!data) {
    return <div>로딩중...</div>;
  }

  const { items: projects } = data;
  // 프로젝트 탭 첫 페이지와 같은 목록을 보여준다
  const thumbnailProjects = getProjectsByType(projects, "SERVICE").slice(
    0,
    ITEMS_PER_PAGE,
  );

  return (
    <ProjectsContainer>
      <ProjectsContent>
        <ProjectsTitle>와플스튜디오의 프로젝트</ProjectsTitle>
        <ProjectsGrid>
          {thumbnailProjects.map(
            ({
              id,
              name,
              summary,
              thumbnail_image,
              project_type,
              is_active,
            }) => {
              const thumb =
                thumbnail_image?.presigned_url || "/image/empty_thumbnail.svg";
              const label = getStatusLabel(project_type);

              return (
                <ProjectCard
                  key={`project-${id}`}
                  onClick={() =>
                    navigate(`/projects/${id}`, { state: { from: "home" } })
                  }
                >
                  <ThumbnailWrapper>
                    <Thumbnail src={thumb} alt={name} loading="lazy" />
                    {is_active && <StatusBadge>{label}</StatusBadge>}
                  </ThumbnailWrapper>
                  <TextContent>
                    <ProjectTitle>{name}</ProjectTitle>
                    <ProjectDescription>{summary}</ProjectDescription>
                  </TextContent>
                </ProjectCard>
              );
            },
          )}
        </ProjectsGrid>
        <ActivitiesCTAButton variant="SERVICE" />
      </ProjectsContent>
    </ProjectsContainer>
  );
};

function getStatusLabel(t: ProjectType) {
  return t === "SERVICE" ? "서비스 중" : "활동 중";
}

const ProjectsContainer = styled.div`
  display: flex;
  padding: 100px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ProjectsContent = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  flex: 1 0 0;
`;

const ProjectsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.32px;
  margin: 0;
`;

const ProjectsGrid = styled.div`
  display: flex;
  max-width: 1200px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 20px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const ProjectCard = styled.div`
  cursor: pointer;
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  align-self: stretch;
  border-radius: 8px;
  overflow: hidden;

  &:hover img {
    transform: scale(1.1);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
`;

const StatusBadge = styled.div`
  display: flex;
  padding: 0.3rem 0.8rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.013rem;
  position: absolute;
  right: 0;
  bottom: 0;
  border-bottom-right-radius: 0.6rem;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const ProjectTitle = styled.div`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.18px;
`;

const ProjectDescription = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.14px;
`;
