import styled from "styled-components";
import { ProjectStatusBadge } from "../../../entities/project/ui/ProjectStatusBadge";
import { useProjectQuery } from "../../../entities/api/useProjectQuery";

export const Projects = () => {
  const { useGetProjects } = useProjectQuery();

  const { data, isError } = useGetProjects({});
  if (isError) {
    return <div>에러 발생</div>;
  }
  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  const { items: projects } = data;
  const thumbnailProjects =
    projects.length > 6 ? projects.slice(0, 6) : projects;

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
