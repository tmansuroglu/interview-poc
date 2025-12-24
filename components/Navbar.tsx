import { PrivateRoutes, PublicRoutes } from "@/lib/enums";
import Link from "next/link";
import { Button } from "./ui/button";
import { verifySession } from "@/lib/session/verify-session";
import { logoutUserAction } from "@/actions/logout-user-action";

export default async function Navbar() {
  const { isAuth } = await verifySession();

  return (
    <nav className="container mx-auto">
      <ul className="flex gap-4 py-2  justify-center">
        <li>
          <Button asChild>
            <Link href={PublicRoutes.Home}>Home</Link>
          </Button>
        </li>
        {isAuth && (
          <li>
            <Button asChild>
              <Link href={PrivateRoutes.Dashboard}>Dashboard</Link>
            </Button>
          </li>
        )}
        {!isAuth && (
          <li>
            <Button asChild>
              <Link href={PublicRoutes.Login}>Login</Link>
            </Button>
          </li>
        )}
        {!isAuth && (
          <li>
            <Button asChild>
              <Link href={PublicRoutes.Register}>Register</Link>
            </Button>
          </li>
        )}
        {isAuth && (
          <li>
            <Button onClick={logoutUserAction}>Logout</Button>;
          </li>
        )}
      </ul>
    </nav>
  );
}
