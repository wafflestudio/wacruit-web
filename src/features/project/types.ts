export type ProjectType = "SERVICE" | "STUDY";

export type UrlType =
  | "ANDROID_STORE"
  | "IOS_APP_STORE"
  | "WEB"
  | "GITHUB_ANDROID"
  | "GITHUB_IOS"
  | "GITHUB_WEB"
  | string;

export interface ProjectImage {
  object_name: string;
  presigned_url: string;
  fields: Record<string, unknown>;
  project_image_id: number;
}

export interface ProjectUrl {
  url_type: UrlType;
  url: string;
}

export interface ProjectListItem {
  id: number;
  name: string;
  summary: string;
  project_type: ProjectType;
  is_active: boolean;
  formed_at?: string;
  thumbnail_image?: ProjectImage | null;
}

export interface ProjectListResponse {
  items: ProjectListItem[];
}

export type Project = ProjectListItem;

export interface ProjectDetail {
  id: number;
  name: string;
  summary: string;
  introduction: string;
  project_type: ProjectType;
  is_active: boolean;
  formed_at?: string;

  thumbnail_image?: ProjectImage | null;
  images: ProjectImage[];
  urls: ProjectUrl[];
}
