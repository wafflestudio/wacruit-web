import { useContext } from "react";
import { UserInfoFormContext } from "./UserInfoFormContext.tsx";

import { Label } from "./Label.ts";

import { UserInfo } from "../../../mocks/types/types.ts";

type LabeledInputProps = {
  children: string;
  name: keyof UserInfo;
  placeholder?: string;
  maxLength?: number;
  type?: "text" | "email";
};

export function LabeledInput({
  name,
  children,
  placeholder,
  maxLength,
  type,
}: LabeledInputProps) {
  const { value, onChange } = useContext(UserInfoFormContext);
  return (
    <Label name={name}>
      <span>{children}</span>
      <input
        value={value[name]}
        onChange={(e) => onChange({ ...value, [name]: e.target.value })}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type}
      />
    </Label>
  );
}
