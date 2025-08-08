import type { SeminarType } from "../../../shared/api/types/seminar";
import type { RecruitingType } from "../../../shared/api/types/recruiting";

export type MainTab = RecruitingType;
type ProgrammersSubTab = "PROGRAMMER";
type DesignersSubTab = "DESIGNER";
export type SubTab = SeminarType | ProgrammersSubTab | DesignersSubTab;

export type SubTabContent = {
  id: SubTab;
  activityInfo: string;
  requirementInfo: string;
};
export type TabContent = {
  id: RecruitingType;
  information: string;
  subTabs: SubTabContent[];
};
