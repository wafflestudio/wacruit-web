import { Project } from "./types";

export const ITEMS_PER_PAGE = 6;

export function formatProjectStatus(
  p: Pick<Project, "project_type" | "is_active">,
) {
  if (p.project_type === "SERVICE")
    return p.is_active ? "서비스 중" : "서비스 종료";
  return p.is_active ? "활동 중" : "활동 종료";
}

export function paginate<T>(data: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const start = (page - 1) * perPage;
  return { items: data.slice(start, start + perPage), totalPages };
}
