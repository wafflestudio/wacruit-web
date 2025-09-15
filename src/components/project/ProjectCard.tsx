import styled from "styled-components";
import { Project, formatProjectStatus } from "../../features/project";

const Card = styled.button`
  display: flex;
  min-width: 30rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  flex: 1 1 30rem;

  @media (max-width: 767px) {
    min-width: auto;
    width: 100%;
  }
  @media (max-width: 30rem) {
    min-width: 0;
    flex-basis: 100%;
    width: 100%;
  }
`;

const Thumbnail = styled.div<{ $src: string }>`
  cursor: pointer;
  position: relative;
  width: 100%;
  aspect-ratio: 14 / 9;
  border-radius: 0.6rem;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $src, theme }) =>
      `url(${$src}) ${theme.colors.black[200]} 50% / cover no-repeat`};
    transition: transform 0.3s ease-in-out;
    transform-origin: center;
  }
  &:hover::before {
    transform: scale(1.1);
  }
`;

const StatusButton = styled.button`
  cursor: pointer;
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
`;

const StatusBadge = styled(StatusButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  border-bottom-right-radius: 0.6rem;
`;

const ProjectInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  align-self: stretch;
`;

const ProjectName = styled.h2`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.018rem;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes[16]};
    letter-spacing: -0.016rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.014rem;
`;

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const showStatus = project.is_active; // 활성일 때만 배지 표시
  return (
    <Card onClick={onClick}>
      <Thumbnail $src={project.thumbnail_url}>
        {showStatus && (
          <StatusBadge>{formatProjectStatus(project)}</StatusBadge>
        )}
      </Thumbnail>

      <ProjectInfo>
        <ProjectName>{project.name}</ProjectName>
        <Description>{project.summary}</Description>
      </ProjectInfo>
    </Card>
  );
}
