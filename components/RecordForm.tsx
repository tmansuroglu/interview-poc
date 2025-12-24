"use client";

import { useId, useState } from "react";
import { Input } from "./ui/input";
import { RecordFields } from "@/lib/enums";
import { ErrorText } from "./ErrorText";
import { Label } from "./ui/label";
import { RECORD_FIELDS_VALIDATION_RULES } from "@/lib/validation-rules";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { RecordState } from "@/lib/types";

type RecordFormProps = {
  pending: boolean;
  state: RecordState;
  formAction: (formData: FormData) => void;
};

export default function RecordForm({
  state,
  pending,
  formAction,
}: RecordFormProps) {
  const [name, setName] = useState("");
  const [isVaccinated, setIsVaccinated] = useState(false);

  const nameInputId = useId();
  const nameErrorId = useId();
  const nameErrors = state?.errors?.name || [];
  const isNameFieldInvalid = nameErrors.length > 0;

  const vaccineInputId = useId();
  const vaccineErrorId = useId();
  const vaccineErrors = state?.errors?.isVaccinated || [];
  const isVaccineFieldInvalid = vaccineErrors.length > 0;

  const generalErrorId = useId();

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2 max-w-lg w-full">
        <Label htmlFor={nameInputId}>Name</Label>
        <Input
          id={nameInputId}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={RECORD_FIELDS_VALIDATION_RULES.name.minLenght.value}
          maxLength={RECORD_FIELDS_VALIDATION_RULES.name.maxLength.value}
          required
          disabled={pending}
          aria-disabled={pending}
          name={RecordFields.Name}
          aria-describedby={isNameFieldInvalid ? nameErrorId : undefined}
          aria-invalid={isNameFieldInvalid}
        />
        {isNameFieldInvalid && (
          <ul id={nameErrorId}>
            {nameErrors.map((str, index) => (
              <ErrorText key={`name field error ${index}`}>{str}</ErrorText>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={vaccineInputId}>Is Vaccinated?</Label>
        <Switch
          checked={isVaccinated}
          onClick={() => setIsVaccinated((prev) => !prev)}
          id={vaccineInputId}
          disabled={pending}
          aria-disabled={pending}
          name={RecordFields.IsVaccinated}
          aria-describedby={isVaccineFieldInvalid ? vaccineErrorId : undefined}
          aria-invalid={isVaccineFieldInvalid}
          aria-checked={!!isVaccinated}
        />
        {isVaccineFieldInvalid && (
          <ul id={vaccineErrorId}>
            {vaccineErrors.map((str, index) => (
              <ErrorText key={`vaccine field error ${index}`}>{str}</ErrorText>
            ))}
          </ul>
        )}
      </div>
      <Button
        type="submit"
        className="mx-auto"
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? "Loading..." : "Submit"}
      </Button>

      {!!state?.message && (
        <ErrorText id={generalErrorId} role="alert" tabIndex={-1} asChild>
          <p>{state.message}</p>
        </ErrorText>
      )}
    </form>
  );
}
