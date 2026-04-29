export type User = {
  id: number;
  sso_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  department: string;
  college: string;
  university: string;
  github_email: string;
  slack_email: string;
  notion_email: string;
};

export type UserUpdate = Pick<User, "department" | "college" | "university">;

export type UserInvitationEmails = {
  github_email: string;
  slack_email: string;
  notion_email: string;
};

export type UserRegisterRequest = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
};
