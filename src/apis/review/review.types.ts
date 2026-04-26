export type Review = {
  id: number;
  title: string;
  content: string;
  member_id: number;
  member_first_name: string;
  member_last_name: string;
  member_position: string;
  member_generation: string;
  is_active: boolean;
};

export type ReviewResponse = {
  items: Review[];
};
