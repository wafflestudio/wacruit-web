import { useState } from "react";
import styled from "styled-components";
import { projectData } from "../mocks/project";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

const PageNumber = styled.button<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  background-color: ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
`;

const Arrow = styled.button<{ disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3rem;
  line-height: 140%;
`;

const Class = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ClassButton = styled.div<{ active: boolean }>`
  text-decoration: underline;
  text-align: center;
  flex: 1 1 50%;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) =>
    props.active ? "#000000" : "#9ca3af"}; /* 회색: tailwind gray-400 */
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5rem;
  gap: 5rem;
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 18rem;
  object-fit: cover;
  border-radius: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Project = styled.h2`
  font-weight: bold;
  font-size: 1.125rem;
`;

const StatusButton = styled.button<{ isActive: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.isActive ? "#bbf7d0" : "#e5e7eb")};
  color: ${(props) => (props.isActive ? "#166534" : "#374151")};
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function ProjectGrid() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"SERVICE" | "STUDY">(
    "SERVICE",
  );

  const filteredProjects = projectData.filter(
    (project) => project.project_type === selectedType,
  );

  const sortedData = [...filteredProjects].sort((a, b) => {
    return Number(b.is_active) - Number(a.is_active);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Wrapper>
      <Title>
        개발과 관련된 것이라면
        <br />
        무엇이든 할 수 있어요!
      </Title>
      <Class>
        <ClassButton
          active={selectedType === "SERVICE"}
          onClick={() => setSelectedType("SERVICE")}
        >
          서비스
        </ClassButton>
        <ClassButton
          active={selectedType === "STUDY"}
          onClick={() => setSelectedType("STUDY")}
        >
          스터디
        </ClassButton>
      </Class>
      <Grid>
        {currentItems.map((project) => (
          <Card
            onClick={() => navigate(`/project/${project.id}`)}
            key={project.id}
          >
            <Thumbnail
              src={project.thumbnail_url}
              alt={project.name}
              onError={(e) => {
                e.currentTarget.src = "";
                e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
            />
            <TitleRow>
              <Project>{project.name}</Project>
              <StatusButton isActive={project.is_active}>
                {project.project_type === "SERVICE"
                  ? project.is_active
                    ? "서비스 중"
                    : "서비스 종료"
                  : project.is_active
                  ? "활동 중"
                  : "활동 종료"}
              </StatusButton>
            </TitleRow>
            <Description>{project.summary}</Description>
          </Card>
        ))}
      </Grid>
      <Pagination>
        <Arrow
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ""
        </Arrow>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageNumber>
        ))}
        <Arrow
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          ""
        </Arrow>
      </Pagination>
    </Wrapper>
  );
}
