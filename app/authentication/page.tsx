"use client";

import { authAction } from "@/app/actions/authenticate";
import { useActionState, useId } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthFields } from "@/lib/field-names";
import { AUTH_FIELDS_VALIDATION_RULES } from "@/lib/field-validations";

import { ErrorText } from "@/components/ErrorText";

// TODO: handle focus based on the response
// TODO: Submit removes input state. It should be kept.

export default function Authenticate() {
  const emailId = useId();
  const passwordId = useId();

  const emailErrorId = useId();
  const passwordErrorId = useId();
  const generalErrorId = useId();

  const [state, formAction, pending] = useActionState(authAction, null);

  const emailErrors = state?.errors?.email || [];
  const passwordErrors = state?.errors?.password || [];

  const isEmailFieldInvalid = emailErrors.length > 0;
  const isPasswordFieldInvalid = passwordErrors.length > 0;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        action={formAction}
        className="space-y-4 flex-col flex w-full max-w-xl"
      >
        <div className="space-y-2">
          <Label htmlFor={emailId}>Email</Label>
          <Input
            id={emailId}
            type="email"
            minLength={AUTH_FIELDS_VALIDATION_RULES.email.minLenght.value}
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
            type="password"
            minLength={AUTH_FIELDS_VALIDATION_RULES.password.minLenght.value}
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
        >
          {pending ? "Loading..." : "Submit"}
        </Button>

        {!!state?.message && (
          <ErrorText id={generalErrorId} role="alert" tabIndex={-1} asChild>
            <p>{state.message}</p>
          </ErrorText>
        )}
      </form>
    </main>
  );
}
