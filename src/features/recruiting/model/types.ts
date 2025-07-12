import type { SeminarType } from "../../../shared/api/types/seminar";

export type MainTab = "ROOKIE" | "PROGRAMMER" | "DESIGNER";
type ProgrammersSubTab = "PROGRAMMER";
type DesignersSubTab = "DESIGNER";
export type SubTab = SeminarType | ProgrammersSubTab | DesignersSubTab;

export type SubTabContent = {
  id: SubTab;
  activityInfo: string;
  requirementInfo: string;
};
export type TabContent = {
  id: MainTab;
  information: string;
  subTabs: SubTabContent[];
};
