import { PublicRoutes } from "@/lib/enums";
import { verifySession } from "@/lib/session/verify-session";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect(PublicRoutes.Login, RedirectType.replace);
  }

  return children;
}
