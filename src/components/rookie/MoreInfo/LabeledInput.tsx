import { useContext } from "react";
import { MoreInfoContext, MoreInfoInput } from "./MoreInfoContext.tsx";

import { Label } from "./Label.ts";

type LabeledInputProps = {
  children: string;
  k: keyof MoreInfoInput;
  placeholder?: string;
};

export function LabeledInput({ k, children, placeholder }: LabeledInputProps) {
  const { value, onChange } = useContext(MoreInfoContext);
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
