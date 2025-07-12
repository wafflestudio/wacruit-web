import type { SeminarType } from "../../../shared/api/types/seminar";

export type MainTab = "ROOKIES" | "PROGRAMMERS" | "DESIGNERS";
type ProgrammersSubTab = "PROGRAMMERS";
type DesignersSubTab = "DESIGNERS";
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
