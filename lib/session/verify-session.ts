import { cookies } from "next/headers";
import { decrypt } from "@/lib/session/decrypt";
import { COOKIE_NAME } from "./utils";

export async function verifySession() {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookie) {
    return { isAuth: false };
  }
  try {
    const session = await decrypt(cookie);
    return {
      isAuth: !!session?.firebaseUserId,
      firebaseUserId: session?.firebaseUserId,
    };
  } catch {
    return { isAuth: false };
  }
}
