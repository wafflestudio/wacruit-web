import { useContext } from "react";
import { UserInfoFormContext } from "./UserInfoFormContext.tsx";

import { Label } from "./Label.ts";

import { UserInfo } from "../../../mocks/types/types.ts";

type LabeledInputProps = {
  children: string;
  name: keyof UserInfo;
  placeholder?: string;
};

export function LabeledInput({
  name,
  children,
  placeholder,
}: LabeledInputProps) {
  const { value, onChange } = useContext(UserInfoFormContext);
  return (
    <Label name={name}>
      <span>{children}</span>
      <input
        value={value[name]}
        onChange={(e) => onChange({ ...value, [name]: e.target.value })}
        placeholder={placeholder}
      />
    </Label>
  );
}
