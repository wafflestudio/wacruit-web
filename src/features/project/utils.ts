import { Project, ProjectType } from "./types";

export const ITEMS_PER_PAGE = 6;

// 프로젝트 탭과 소개 탭이 같은 순서를 보여주도록 정렬 기준을 한곳에서 관리한다.
// 진행 중인 것을 먼저 보여주고, 그 안에서는 서버가 준 순서를 유지한다.
export function getProjectsByType(projects: Project[], type: ProjectType) {
  return projects
    .filter((project) => project.project_type === type)
    .sort((a, b) => Number(b.is_active) - Number(a.is_active));
}

export function formatProjectStatus(
  p: Pick<Project, "project_type" | "is_active">,
) {
  if (p.project_type === "SERVICE")
    return p.is_active ? "서비스 중" : "서비스 종료";
  return p.is_active ? "활동 중" : "활동 종료";
}

export function paginate<T>(data: T[], page: number, perPage: number) {
  const safePerPage = Math.max(1, perPage);
  const safePage = Math.max(1, page);
  const totalPages = Math.max(1, Math.ceil(data.length / safePerPage));
  const start = (safePage - 1) * safePerPage;
  return {
    items: data.slice(start, start + safePerPage),
    totalPages,
  };
}
