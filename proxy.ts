import { NextRequest, NextResponse } from "next/server";
import { PrivateRoutes, PublicRoutes } from "@/lib/enums";
import { verifySession } from "@/lib/session/verify-session";

const privateRoutes: string[] = Object.values(PrivateRoutes);

export default async function proxy(req: NextRequest) {
  const { isAuth } = await verifySession();

  const path = req.nextUrl.pathname;

  const isInPrivateRoute = privateRoutes.includes(path);

  if (isInPrivateRoute && !isAuth) {
    return NextResponse.redirect(new URL(PublicRoutes.Login, req.nextUrl));
  }

  if (
    isAuth &&
    (path === PublicRoutes.Login || path === PublicRoutes.Register)
  ) {
    return NextResponse.redirect(new URL(PrivateRoutes.Dashboard, req.nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" to learn more
export const config = {
  /*
   * Match all request paths except:
   * - / (root path) * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico$)(?!^/$).*)"],
};
