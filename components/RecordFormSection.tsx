"use client";

import { useActionState } from "react";
import RecordForm from "./RecordForm";
import { insertRecordAction } from "@/actions/record/insert-record-action";

export default function RecordFormSection() {
  const [state, formAction, pending] = useActionState(insertRecordAction, null);

  return (
    <section>
      <RecordForm
        state={state}
        formAction={formAction}
        pending={pending}
        key={state?.resetId}
      />
    </section>
  );
}
