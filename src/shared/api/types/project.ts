import { ProjectType } from "../../../entities/project/model/types";

export type ProjectListItem = {
  id: number;
  name: string;
  summary: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
};

export type BriefProjectList = {
  items: ProjectListItem[];
};

export type ProjectImage = {
  object_name: string;
  presigned_url: string;
  fields: Record<string, unknown>;
  project_image_id: number;
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
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
  images: ProjectImage[];
  urls: ProjectUrl[];
};
