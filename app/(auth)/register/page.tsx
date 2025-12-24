"use client";

import { registerUserAction } from "@/actions/register-user-action";
import { AuthForm } from "@/components/AuthForm";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUserAction, null);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center space-y-4">
      <h1>Register Page</h1>
      <AuthForm state={state} formAction={formAction} pending={pending} />
    </main>
  );
}
