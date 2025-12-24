"use client";

import { ReactNode, useId, useState } from "react";
import { Label } from "./ui/label";
import { Switch, SwitchProps } from "./ui/switch";
import { ErrorText } from "./ErrorText";

type FormSwitchFieldProps = SwitchProps & {
  label?: ReactNode;
  errors?: string[];
};

export default function FormSwitchField({
  label,
  errors = [],
  ...props
}: FormSwitchFieldProps) {
  const [isChecked, setIsChecked] = useState(false);

  const inputId = useId();
  const errorId = useId();

  const isFieldInvalid = errors.length > 0;
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Switch
        {...props}
        role="switch"
        checked={isChecked}
        aria-checked={!!isChecked}
        onClick={() => setIsChecked((prev) => !prev)}
        id={inputId}
        aria-disabled={props.disabled}
        aria-describedby={isFieldInvalid ? errorId : undefined}
        aria-invalid={isFieldInvalid}
      />
      {isFieldInvalid && (
        <ul id={errorId}>
          {errors.map((str, index) => (
            <ErrorText key={`form switch field error ${index}`}>
              {str}
            </ErrorText>
          ))}
        </ul>
      )}
    </div>
  );
}
