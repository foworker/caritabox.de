import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type StepInputProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const StepInput = ({
  id,
  name,
  label,
  value,
  required = false,
  placeholder,
  type = "text",
  onChange,
}: StepInputProps) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
};
