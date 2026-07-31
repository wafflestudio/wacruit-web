export type PreRegisterResponse = {
  id: number;
  url: string;
  generation: string;
  is_active: boolean;
};

// 학교 관련 항목은 서버에서 선택 항목이다
export type PreRegisterUserCreate = {
  name: string;
  email: string;
  phone_number: string;
  university?: string;
  college?: string;
  department?: string;
};

export type PreRegisterUserResponse = {
  id: number;
  pre_registration_id: number;
} & PreRegisterUserCreate;
