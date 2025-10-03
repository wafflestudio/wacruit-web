export type ProjectType = "SERVICE" | "STUDY";

export interface ProjectListItem {
  id: number;
  name: string;
  summary: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
}

export interface ProjectListResponse {
  items: ProjectListItem[];
}

export type Project = ProjectListItem;

export type UrlType =
  | "ANDROID_STORE"
  | "IOS_APP_STORE"
  | "WEB"
  | "GITHUB_ANDROID"
  | "GITHUB_IOS"
  | "GITHUB_WEB"
  | string;

export interface ProjectUrl {
  url_type: UrlType;
  url: string;
}

export interface ProjectImage {
  object_name: string;
  presigned_url: string;
  fields: Record<string, unknown>;
  project_image_id: number;
}

export interface ProjectDetail {
  id: number;
  name: string;
  summary: string;
  introduction: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
  images: ProjectImage[];
  urls: ProjectUrl[];
}
