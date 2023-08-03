import { createContext } from "react";

import { UserInvitationEmails, UserUpdate } from "../../../types/apiTypes.ts";

export type UserInfoFormProps = {
  value: UserUpdate & UserInvitationEmails;
  onChange: (value: UserUpdate & UserInvitationEmails) => void;
};

// props 내리면 코드가 못생겨진다
export const UserInfoFormContext = createContext({} as UserInfoFormProps);
