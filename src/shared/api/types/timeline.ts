export type TimelineGroupType = "ROOKIES" | "PROGRAMMERS" | "DESIGNERS";

type TimelineCategoryResponse = {
  id: number;
  title: string;
};

export type TimelineResponse = {
  id: number;
  title: string;
  group: TimelineGroupType;
  category: TimelineCategoryResponse;
  start_date: string;
  end_date: string;
};

export type TimelineListResponse = {
  timeline: TimelineResponse[];
};
