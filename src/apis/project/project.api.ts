import { getRequest, encodeQueryParams } from "../utility";
import type {
  ProjectListResponse,
  ProjectListItem,
  ProjectDetail,
  ProjectUrl,
  ProjectImage,
} from "../../features/project/types";

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

function isProjectThumbnail(v: unknown): v is ProjectImage {
  return (
    isObject(v) &&
    typeof v.project_image_id === "number" &&
    typeof v.presigned_url === "string"
  );
}

type ServerProjectList = {
  items: (Omit<ProjectListItem, "thumbnail_image"> & {
    thumbnail_image?: unknown;
  })[];
};

type ServerProjectDetail = Omit<
  ProjectDetail,
  "urls" | "images" | "thumbnail_image"
> & {
  urls: unknown;
  images: unknown;
  thumbnail_image?: unknown;
};

export const getProjects = async ({
  queryParams,
}: {
  queryParams?: { offset?: number; limit?: number };
}) => {
  const offset = queryParams?.offset ?? 0;
  const limit = queryParams?.limit ?? 1000;
  const query = encodeQueryParams({ params: { offset, limit } });

  const res = await getRequest<ServerProjectList>(`/v3/projects?${query}`);

  const normalizedItems: ProjectListItem[] = res.items.map((p) => ({
    ...p,
    thumbnail_image: isProjectThumbnail(p.thumbnail_image)
      ? p.thumbnail_image
      : null,
  }));

  const out: ProjectListResponse = { items: normalizedItems };
  return out;
};

export const getProjectDetail = async (projectId: number | string) => {
  const d = await getRequest<ServerProjectDetail>(`/v3/projects/${projectId}`);

  const urls: ProjectUrl[] = isProjectUrlArray(d.urls) ? d.urls : [];
  const images: ProjectImage[] = isProjectImageArray(d.images) ? d.images : [];
  const thumbnail_image = isProjectThumbnail(d.thumbnail_image)
    ? d.thumbnail_image
    : null;

  const normalized: ProjectDetail = { ...d, urls, images, thumbnail_image };
  return normalized;
};
