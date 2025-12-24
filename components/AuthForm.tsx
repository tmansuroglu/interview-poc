import { Button } from "@/components/ui/button";
import { AUTH_FIELDS_VALIDATION_RULES } from "@/lib/validation-rules";
import { ErrorText } from "@/components/ErrorText";
import { AuthState } from "@/lib/types";
import { AuthFields } from "@/lib/enums";
import FormInputField from "./FormInputField";

type AuthFormProps = {
  pending: boolean;
  state: AuthState;
  formAction: (formData: FormData) => void;
};

// TODO: handle focus based on the response
export function AuthForm({ pending, state, formAction }: AuthFormProps) {
  const emailErrors = state?.errors?.email || [];
  const passwordErrors = state?.errors?.password || [];

  return (
    <form
      action={formAction}
      className="space-y-4 flex-col flex w-full max-w-xl"
    >
      <FormInputField
        label="Email"
        type="email"
        minLength={AUTH_FIELDS_VALIDATION_RULES.email.minLength.value}
        maxLength={AUTH_FIELDS_VALIDATION_RULES.email.maxLength.value}
        required
        disabled={pending}
        name={AuthFields.Email}
        errors={emailErrors}
      />
      <FormInputField
        label="Password"
        type="password"
        minLength={AUTH_FIELDS_VALIDATION_RULES.password.minLength.value}
        maxLength={AUTH_FIELDS_VALIDATION_RULES.password.maxLength.value}
        required
        disabled={pending}
        name={AuthFields.Password}
        errors={passwordErrors}
      />
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
        <ErrorText role="alert" asChild>
          <p>{state.message}</p>
        </ErrorText>
      )}
    </form>
  );
}
