import type { SeminarType } from "../../../apis/seminar/seminar.types";
import type { RecruitingTypeV2 as RecruitingType } from "../../../apis/recruiting/recruiting.types";

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
