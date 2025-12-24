"use client";

import { insertRecordAction } from "@/actions/record/insert-record-action";
import RecordForm from "@/components/RecordForm";
import { useActionState } from "react";

export default function DashboardPage() {
  const [state, formAction, pending] = useActionState(insertRecordAction, null);

  return (
    <main className="space-y-6">
      <h1>Dasboard</h1>
      <RecordForm
        state={state}
        formAction={formAction}
        pending={pending}
        key={state?.resetId}
      />
    </main>
  );
}
