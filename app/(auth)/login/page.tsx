"use client";

import { loginUserAction } from "@/actions/login-user-action";
import { AuthForm } from "@/components/AuthForm";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginUserAction, null);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center space-y-4">
      <h1>Login Page</h1>
      <AuthForm state={state} formAction={formAction} pending={pending} />
    </main>
  );
}
