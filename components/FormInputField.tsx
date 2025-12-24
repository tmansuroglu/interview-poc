"use client";

import { ComponentProps, ReactNode, useId, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ErrorText } from "./ErrorText";

type FormInputFieldProps = ComponentProps<"input"> & {
  label?: ReactNode;
  errors?: string[];
};

export default function FormInputField({
  label,
  errors = [],
  ...props
}: FormInputFieldProps) {
  const [value, setValue] = useState("");
  const inputId = useId();
  const errorId = useId();

  const isFieldInvalid = errors.length > 0;

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input
        {...props}
        id={inputId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-disabled={props.disabled}
        aria-describedby={isFieldInvalid ? errorId : undefined}
        aria-invalid={isFieldInvalid}
      />
      {isFieldInvalid && (
        <ul id={errorId}>
          {errors.map((str, index) => (
            <ErrorText key={`form input field error ${index}`}>{str}</ErrorText>
          ))}
        </ul>
      )}
    </div>
  );
}
