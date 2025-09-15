import { useMemo, useState } from "react";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { projectData } from "../mocks/project";
import { useRouteNavigation } from "../shared/routes/useRouteNavigation";

import {
  CategoryTabs,
  ProjectCard,
  Pagination,
  HeaderOffset,
  Wrapper,
  Title,
  TitleGroup,
  ContentGroup,
  ClassAndGrid,
  Grid,
} from "../components/project";

import { ITEMS_PER_PAGE, paginate } from "../features/project";
import type { Project, ProjectType } from "../features/project";

export default function ProjectPage() {
  const { toProjectDetail } = useRouteNavigation();
  const [selectedType, setSelectedType] = useState<ProjectType>("SERVICE");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () => projectData.filter((p: Project) => p.project_type === selectedType),
    [selectedType],
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => Number(b.is_active) - Number(a.is_active)),
    [filtered],
  );

  const { items: currentItems, totalPages } = useMemo(
    () => paginate(sorted, currentPage, ITEMS_PER_PAGE),
    [sorted, currentPage],
  );

  const handleChangeType = (t: ProjectType) => {
    setSelectedType(t);
    setCurrentPage(1);
  };

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
              <Grid>
                {currentItems.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => toProjectDetail({ projectId: project.id })}
                  />
                ))}
              </Grid>
            </ClassAndGrid>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
          </ContentGroup>
        </TitleGroup>
      </Wrapper>
    </>
  );
}
