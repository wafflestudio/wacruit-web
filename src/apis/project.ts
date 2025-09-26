import { getRequest, encodeQueryParams } from "./utility";
import type {
  BriefProjectList,
  ProjectDetail,
  ProjectUrl,
  ProjectImage,
} from "../shared/api/types/project";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isProjectUrlArray(v: unknown): v is ProjectUrl[] {
  return (
    Array.isArray(v) &&
    v.every(
      (u) =>
        isObject(u) &&
        typeof (u as Record<string, unknown>).url === "string" &&
        typeof (u as Record<string, unknown>).url_type === "string",
    )
  );
}

function isProjectImageArray(v: unknown): v is ProjectImage[] {
  return (
    Array.isArray(v) &&
    v.every(
      (img) =>
        isObject(img) &&
        typeof (img as Record<string, unknown>).project_image_id === "number" &&
        typeof (img as Record<string, unknown>).presigned_url === "string",
    )
  );
}

type ServerProjectDetail = Omit<ProjectDetail, "urls" | "images"> & {
  urls: unknown;
  images: unknown;
};

export const getProjects = ({
  queryParams,
}: {
  queryParams?: { offset?: number; limit?: number };
}) => {
  const offset = queryParams?.offset ?? 0;
  const limit = queryParams?.limit ?? 1000;
  const query = encodeQueryParams({ params: { offset, limit } });
  return getRequest<BriefProjectList>(`/v3/projects?${query}`);
};

export const getProjectDetail = (projectId: number | string) =>
  getRequest<ServerProjectDetail>(`/v3/projects/${projectId}`).then((d) => {
    const urls: ProjectUrl[] = isProjectUrlArray(d.urls) ? d.urls : [];
    const images: ProjectImage[] = isProjectImageArray(d.images)
      ? d.images
      : [];
    const normalized: ProjectDetail = { ...d, urls, images };
    return normalized;
  });
