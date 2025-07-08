type RecruitingType = "ROOKIE" | "DESIGNER" | "PROGRAMMER";

export type BreifRecruiting = {
  id: number;
  name: string;
  generation: string;
  type: RecruitingType;
  is_active: boolean;
  from_date: string;
  to_date: string;
  applicant_count: number;
  short_description: string;
};
