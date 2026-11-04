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

export type PreRegisterListResponse = {
  items: PreRegisterResponse[];
};

export type PreRegisterUserListResponse = {
  items: PreRegisterUserResponse[];
};

export type PreRegisterUserListParams = {
  pre_registration_id: number;
  limit: number;
  offset: number;
};

export type PreRegisterUpdate = Partial<
  Pick<PreRegisterResponse, "url" | "generation" | "is_active">
>;

export type PreRegisterEmailAttachment = {
  file_name: string;
  content_type: string;
  content_base64: string;
};

// 메일 HTML의 <img src="cid:{content_id}">로 참조한다. content_id에 cid: 접두사는 넣지 않는다
export type PreRegisterEmailInlineImage = PreRegisterEmailAttachment & {
  content_id: string;
};

export type PreRegisterEmailSend = {
  subject: string;
  content?: string;
  html_content?: string;
  pre_registration_id?: number;
  active_only?: boolean;
  attachments?: PreRegisterEmailAttachment[];
  inline_images?: PreRegisterEmailInlineImage[];
};

export type PreRegisterEmailSendResponse = {
  status: string;
  total_count: number;
  queued_count: number;
  recipient_limit: number;
  is_truncated: boolean;
};
