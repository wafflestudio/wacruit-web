export type RecruitingType = "ROOKIE" | "DESIGNER" | "PROGRAMMER";

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

type RecruitingInfoResponse = {
  id: number;
  type: RecruitingType;
  info_num: number;
  title: string;
  date_info: string;
};

export type RecruitingInfoListResponse = {
  items: RecruitingInfoResponse[];
};
