import styled from "styled-components";
import { ProjectStatusBadge } from "../../../entities/project/ui/ProjectStatusBadge";
import { BreifProjectList } from "../../../shared/api/types/projects";

export const Projects = () => {
  const MOCK_BRIEF_PROJECT_DATA: BreifProjectList = {
    projects: [
      {
        id: 1,
        name: "SNUTT",
        brief_introduction: "한줄 소개",
        thumbnail_url: "https://example.com/thumbnail.jpg",
        project_type: "PROJECT",
        is_active: true,
      },
      {
        id: 1,
        name: "식샤",
        brief_introduction: "한줄 소개",
        thumbnail_url: "https://example.com/thumbnail.jpg",
        project_type: "STUDY",
        is_active: true,
      },
      {
        id: 3,
        name: "비활성 프로젝트",
        brief_introduction: "표시되지 않아야 함",
        thumbnail_url: "https://example.com/thumbnail.jpg",
        project_type: "PROJECT",
        is_active: false,
      },
    ],
  };

  const { projects } = MOCK_BRIEF_PROJECT_DATA;
  const thumbnailProjects =
    projects.length > 12 ? projects.slice(0, 12) : projects;

  return (
    <Wrapper>
      <Title>와플스튜디오의 프로젝트</Title>
      <ProjectGrid>
        {thumbnailProjects.map(
          ({
            id,
            name,
            brief_introduction,
            thumbnail_url,
            project_type,
            is_active,
          }) => (
            <ProjectCard key={`project-${id}`}>
              <Thumbnail src={thumbnail_url} alt={name} />
              <CardContent>
                <CardHeader>
                  <ProjectName>{name}</ProjectName>
                  <ProjectStatusBadge
                    isActive={is_active}
                    projectType={project_type}
                  />
                </CardHeader>
                <Brief>{brief_introduction}</Brief>
              </CardContent>
            </ProjectCard>
          ),
        )}
      </ProjectGrid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const ProjectCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectName = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

const Brief = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: 0;
`;
