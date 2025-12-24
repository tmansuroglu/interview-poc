import { cookies } from "next/headers";
import { encrypt } from "./encrypt";
import { COOKIE_NAME } from "./utils";

export async function createSession(firebaseUserId: string) {
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

  const expiresAt = new Date(Date.now() + sevenDaysInMs);

  const expiresAtInSeconds = Math.floor(expiresAt.getTime() / 1000);

  const session = await encrypt({
    payload: { firebaseUserId },
    expiresAtInSeconds,
  });

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
