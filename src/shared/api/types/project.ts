import { ProjectType } from "../../../entities/project/model/types";

export type ProjectImage = {
  object_name: string;
  presigned_url: string;
  fields: Record<string, unknown>;
  project_image_id: number;
};

export type ProjectListItem = {
  id: number;
  name: string;
  summary: string;
  project_type: ProjectType;
  is_active: boolean;
  thumbnail_image?: ProjectImage | null;
  formed_at?: string;
};

export type BriefProjectList = {
  items: ProjectListItem[];
};

export type UrlType =
  | "ANDROID_STORE"
  | "IOS_APP_STORE"
  | "WEB"
  | "GITHUB_ANDROID"
  | "GITHUB_IOS"
  | "GITHUB_WEB"
  | string;

export type ProjectUrl = {
  url_type: UrlType;
  url: string;
};

export type ProjectDetail = {
  id: number;
  name: string;
  summary: string;
  introduction: string;
  project_type: ProjectType;
  is_active: boolean;
  thumbnail_image?: ProjectImage | null;
  images: ProjectImage[];
  urls: ProjectUrl[];
  formed_at?: string;
};
