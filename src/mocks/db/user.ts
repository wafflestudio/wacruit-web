import { User } from "../../types/apiTypes.ts";

export const getMockUser = () => user;

export const setMockUser = (data: User) => {
  user = data;
};
export let user: User = {
  id: 0,
  sso_id: "sample",
  first_name: "와플",
  last_name: "김",
  phone_number: "01012345678",
  email: "test@wafflestudio.com",
  department: "",
  college: "",
  university: "",
  github_email: "",
  slack_email: "",
  notion_email: "",
};
