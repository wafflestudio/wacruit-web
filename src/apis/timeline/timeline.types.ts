export type TimelineGroupType = "ROOKIE" | "PROGRAMMER" | "DESIGNER";

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
  items: TimelineResponse[];
};
