import { createContext } from "react";

import { UserInfo } from "../../../mocks/types/types.ts";

export type UserInfoFormProps = {
  value: UserInfo;
  onChange: (value: UserInfo) => void;
};

// props 내리면 코드가 못생겨진다
export const UserInfoFormContext = createContext({} as UserInfoFormProps);
