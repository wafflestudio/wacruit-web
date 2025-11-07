import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import Headerv2 from "../shared/ui/header/HeaderV2";
import Footer from "../shared/ui/footer/Footer";

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
import type { ProjectListItem, ProjectType } from "../features/project/types";

const ITEMS_PER_PAGE = 6;

function isFetchResponse(e: unknown): e is Response {
  return typeof e === "object" && e !== null && "ok" in e && "status" in e;
}

export default function ProjectPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = (searchParams.get("type") as ProjectType) ?? "SERVICE";
  const initialPage = Math.max(1, Number(searchParams.get("page") ?? 1));

  const [selectedType, setSelectedType] = useState<ProjectType>(initialType);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const t = (searchParams.get("type") as ProjectType) ?? "SERVICE";
    const p = Math.max(1, Number(searchParams.get("page") ?? 1));
    setSelectedType(t);
    setCurrentPage(p);
  }, [searchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects", { offset: 0, limit: 1000 }],
    queryFn: () => getProjects({ queryParams: { offset: 0, limit: 1000 } }),
  });

  const allItems = useMemo<ProjectListItem[]>(() => data?.items ?? [], [data]);

  const handleChangeType = (t: ProjectType) => {
    setSelectedType(t);
    setCurrentPage(1);
    setSearchParams({ type: t, page: "1" });
  };

  const handleChangePage = (p: number) => {
    setCurrentPage(p);
    setSearchParams({ type: selectedType, page: String(p) });
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
                  {currentItems.map((project) => {
                    const qs = `?type=${selectedType}&page=${currentPage}`;
                    return (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => navigate(`/projects/${project.id}${qs}`)}
                      />
                    );
                  })}
                </Grid>
              )}
            </ClassAndGrid>

            {!isLoading && !isError && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={handleChangePage}
              />
            )}
          </ContentGroup>
        </TitleGroup>
      </Wrapper>
      <Footer />
    </>
  );
}
