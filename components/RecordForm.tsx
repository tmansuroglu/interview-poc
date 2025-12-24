import { RecordFields } from "@/lib/enums";
import { ErrorText } from "./ErrorText";
import { RECORD_FIELDS_VALIDATION_RULES } from "@/lib/validation-rules";
import { Button } from "./ui/button";
import { InsertRecordState } from "@/lib/types";
import FormInputField from "./FormInputField";
import FormSwitchField from "./FormSwitchField";

type RecordFormProps = {
  pending: boolean;
  state: InsertRecordState;
  formAction: (formData: FormData) => void;
};

// TODO: handle focus based on the response
export default function RecordForm({
  state,
  pending,
  formAction,
}: RecordFormProps) {
  const nameErrors = state?.errors?.name || [];
  const vaccineErrors = state?.errors?.isVaccinated || [];

  return (
    <form action={formAction} className="space-y-4">
      <FormInputField
        label="Name"
        type="text"
        minLength={RECORD_FIELDS_VALIDATION_RULES.name.minLength.value}
        maxLength={RECORD_FIELDS_VALIDATION_RULES.name.maxLength.value}
        required
        disabled={pending}
        name={RecordFields.Name}
        errors={nameErrors}
      />
      <FormSwitchField
        label="Is Vaccinated?"
        disabled={pending}
        name={RecordFields.IsVaccinated}
        errors={vaccineErrors}
      />
      <Button
        type="submit"
        className="mx-auto"
        disabled={pending}
        aria-busy={pending}
        aria-disabled={pending}
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
