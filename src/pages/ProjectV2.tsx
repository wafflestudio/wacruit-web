<<<<<<< HEAD
import { useState } from "react";
import styled from "styled-components";
import { projectData } from "../mocks/project";
import { useRouteNavigation } from "../shared/routes/useRouteNavigation";

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

const ClassButton = styled.div<{ $active: boolean }>`
  text-decoration: underline;
  text-align: center;
  flex: 1 1 50%;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) =>
    $active ? "#000000" : "#9ca3af"}; /* 회색: tailwind gray-400 */
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

const StatusButton = styled.button<{ $isActive: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ $isActive }) => ($isActive ? "#bbf7d0" : "#e5e7eb")};
  color: ${({ $isActive }) => ($isActive ? "#166534" : "#374151")};
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function ProjectV2() {
  const { toProjectDetail } = useRouteNavigation();
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
  const formatProjectStatus = (project: {
    project_type: string;
    is_active: boolean;
  }): string => {
    if (project.project_type === "SERVICE") {
      return project.is_active ? "서비스 중" : "서비스 종료";
    } else {
      return project.is_active ? "활동 중" : "활동 종료";
    }
  };

  return (
    <Wrapper>
      <Title>
        개발과 관련된 것이라면
        <br />
        무엇이든 할 수 있어요!
      </Title>
      <Class>
        <ClassButton
          $active={selectedType === "SERVICE"}
          onClick={() => setSelectedType("SERVICE")}
        >
          서비스
        </ClassButton>
        <ClassButton
          $active={selectedType === "STUDY"}
          onClick={() => setSelectedType("STUDY")}
        >
          스터디
        </ClassButton>
      </Class>
      <Grid>
        {currentItems.map((project) => (
          <Card
            onClick={() => toProjectDetail({ projectId: project.id })}
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
              <StatusButton $isActive={project.is_active}>
                {formatProjectStatus(project)}
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
=======
// src/pages/Project.tsx
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Headerv2 from "../shared/ui/header/HeaderV2";
import Footer from "../shared/ui/footer/Footer";
import { useRouteNavigation } from "../shared/routes/useRouteNavigation";
import {
  HeaderOffset,
  Wrapper,
  Title,
  TitleGroup,
  ContentGroup,
  ClassAndGrid,
  Grid,
} from "../components/project";
import { CategoryTabs, ProjectCard, Pagination } from "../components/project";
import { getProjects } from "../apis/project";
import type { ProjectListItem } from "../shared/api/types/project";
import type { ProjectType } from "../entities/project/model/types";

const ITEMS_PER_PAGE = 6;

function isFetchResponse(e: unknown): e is Response {
  return typeof e === "object" && e !== null && "ok" in e && "status" in e;
}

export default function ProjectPage() {
  const { toProjectDetail } = useRouteNavigation();

  const [selectedType, setSelectedType] = useState<ProjectType>("SERVICE");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects", { offset: 0, limit: 1000 }],
    queryFn: () => getProjects({ queryParams: { offset: 0, limit: 1000 } }),
  });

  const allItems = useMemo<ProjectListItem[]>(() => data?.items ?? [], [data]);

  const handleChangeType = (t: ProjectType) => {
    setSelectedType(t);
    setCurrentPage(1);
  };

  const filtered = useMemo(
    () => allItems.filter((p) => p.project_type === selectedType),
    [allItems, selectedType],
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => Number(b.is_active) - Number(a.is_active)),
    [filtered],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [sorted, currentPage]);

  const errorMessage = isError
    ? error instanceof Error
      ? error.message
      : isFetchResponse(error)
      ? `HTTP ${error.status}`
      : "프로젝트 목록을 불러오지 못했습니다."
    : null;

  return (
    <>
      <Headerv2 />
      <HeaderOffset />
      <Wrapper>
        <TitleGroup>
          <Title>
            개발과 관련된 것이라면
            <br />
            무엇이든 할 수 있어요!
          </Title>

          <ContentGroup>
            <ClassAndGrid>
              <CategoryTabs value={selectedType} onChange={handleChangeType} />

              {isLoading ? (
                <div style={{ color: "#fff" }}>로딩 중…</div>
              ) : isError ? (
                <div style={{ color: "salmon" }}>{errorMessage}</div>
              ) : (
                <Grid>
                  {currentItems.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => toProjectDetail({ projectId: project.id })}
                    />
                  ))}
                </Grid>
              )}
            </ClassAndGrid>

            {!isLoading && !isError && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            )}
          </ContentGroup>
        </TitleGroup>
      </Wrapper>
      <Footer />
    </>
>>>>>>> origin/main
  );
}
