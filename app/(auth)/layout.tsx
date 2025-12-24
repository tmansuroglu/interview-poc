import { PrivateRoutes } from "@/lib/enums";
import { verifySession } from "@/lib/session/verify-session";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuth } = await verifySession();

  if (isAuth) {
    redirect(PrivateRoutes.Dashboard, RedirectType.replace);
  }

  return children;
}
