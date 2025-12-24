"use client";

import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTH_FIELDS_VALIDATION_RULES } from "@/lib/validation-rules";
import { ErrorText } from "@/components/ErrorText";
import { AuthState } from "@/lib/types";
import { AuthFields } from "@/lib/enums";

type AuthFormProps = {
  pending: boolean;
  state: AuthState;
  formAction: (formData: FormData) => void;
};

// TODO: handle focus based on the response
export function AuthForm({ pending, state, formAction }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailId = useId();
  const passwordId = useId();

  const emailErrorId = useId();
  const passwordErrorId = useId();
  const generalErrorId = useId();

  const emailErrors = state?.errors?.email || [];
  const passwordErrors = state?.errors?.password || [];

  const isEmailFieldInvalid = emailErrors.length > 0;
  const isPasswordFieldInvalid = passwordErrors.length > 0;

  return (
    <form
      action={formAction}
      className="space-y-4 flex-col flex w-full max-w-xl"
    >
      <div className="space-y-2">
        <Label htmlFor={emailId}>Email</Label>
        <Input
          id={emailId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={AUTH_FIELDS_VALIDATION_RULES.email.minLength.value}
          maxLength={AUTH_FIELDS_VALIDATION_RULES.email.maxLength.value}
          required
          disabled={pending}
          aria-disabled={pending}
          name={AuthFields.Email}
          aria-describedby={isEmailFieldInvalid ? emailErrorId : undefined}
          aria-invalid={isEmailFieldInvalid}
        />
        {isEmailFieldInvalid && (
          <ul id={emailErrorId}>
            {emailErrors.map((str, index) => (
              <ErrorText key={`email error ${index}`}>{str}</ErrorText>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          minLength={AUTH_FIELDS_VALIDATION_RULES.password.minLength.value}
          maxLength={AUTH_FIELDS_VALIDATION_RULES.password.maxLength.value}
          required
          disabled={pending}
          aria-disabled={pending}
          name={AuthFields.Password}
          aria-describedby={
            isPasswordFieldInvalid ? passwordErrorId : undefined
          }
          aria-invalid={isPasswordFieldInvalid}
        />
        {isPasswordFieldInvalid && (
          <ul id={passwordErrorId}>
            {passwordErrors.map((str, index) => (
              <ErrorText key={`password error ${index}`}>{str}</ErrorText>
            ))}
          </ul>
        )}
      </div>

      <Button
        type="submit"
        className="mx-auto"
        disabled={pending}
        aria-disabled={pending}
        aria-busy={pending}
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
