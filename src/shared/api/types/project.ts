import { ProjectType } from "../../../entities/project/model/types";

type BreifProject = {
  id: number;
  name: string;
  brief_introduction: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
};

export type BreifProjectList = {
  projects: BreifProject[];
};
