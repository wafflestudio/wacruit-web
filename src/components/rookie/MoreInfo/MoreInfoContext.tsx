import { createContext } from "react";

export type MoreInfoProps = {
  value: MoreInfoInput;
  onChange: (value: MoreInfoInput) => void;
};

// props 내리면 코드가 못생겨진다
export const MoreInfoContext = createContext({} as MoreInfoProps);
export type MoreInfoInput = {
  admission: string;
  status: string;
  university: string;
  college: string;
  major: string;
  github_id: string;
  slack_email: string;
  notion_email: string;
};
