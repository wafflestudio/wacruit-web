export type MainTab = "ROOKIES" | "PROGRAMMERS" | "DESIGNERS";
type RookiesSubTab = "SPRING" | "FAST_API" | "FRONTEND" | "ANDROID" | "IOS";
type ProgrammersSubTab = "PROGRAMMERS";
type DesignersSubTab = "DESIGNERS";
export type SubTab = RookiesSubTab | ProgrammersSubTab | DesignersSubTab;

export type SubTabContent = {
  id: SubTab;
  activityInfo: string[];
  requirementInfo: string[];
};
export type TabContent = {
  id: MainTab;
  information: string;
  subTabs: SubTabContent[];
};
