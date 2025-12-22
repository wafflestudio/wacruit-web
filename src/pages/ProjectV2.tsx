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

/* 쿼리 파라미터 정규화 */
const normalizeType = (value: string | null): ProjectType =>
  value === "SERVICE" || value === "STUDY" ? value : "SERVICE";

const normalizePage = (value: string | null): number => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : 1;
};

export default function ProjectPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = normalizeType(searchParams.get("type"));
  const initialPage = normalizePage(searchParams.get("page"));

  const [selectedType, setSelectedType] = useState<ProjectType>(initialType);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const t = normalizeType(searchParams.get("type"));
    const p = normalizePage(searchParams.get("page"));
    setSelectedType(t);
    setCurrentPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects", { offset: 0, limit: 1000 }],
    queryFn: () => getProjects({ queryParams: { offset: 0, limit: 1000 } }),
  });

  const allItems = useMemo<ProjectListItem[]>(() => data?.items ?? [], [data]);

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

  const handleChangeType = (t: ProjectType) => {
    setSelectedType(t);
    setCurrentPage(1);
    setSearchParams({ type: t, page: "1" });
  };

  const handleChangePage = (p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setCurrentPage(clamped);
    setSearchParams({ type: selectedType, page: String(clamped) });
  };

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
