export type ProjectType = "SERVICE" | "STUDY";

export interface Project {
  id: string | number;
  name: string;
  summary: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
}
