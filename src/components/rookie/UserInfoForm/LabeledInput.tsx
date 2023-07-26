import { useContext } from "react";
import { UserInfoFormContext } from "./UserInfoFormContext.tsx";

import { Label } from "./Label.ts";

import { UserInfo } from "../../../mocks/types/types.ts";

type LabeledInputProps = {
  children: string;
  k: keyof UserInfo;
  placeholder?: string;
};

export function LabeledInput({ k, children, placeholder }: LabeledInputProps) {
  const { value, onChange } = useContext(UserInfoFormContext);
  return (
    <Label k={k}>
      <span>{children}</span>
      <input
        value={value[k]}
        onChange={(e) => onChange({ ...value, [k]: e.target.value })}
        placeholder={placeholder}
      />
    </Label>
  );
}
