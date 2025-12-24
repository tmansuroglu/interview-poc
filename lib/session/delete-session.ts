import { cookies } from "next/headers";
import { COOKIE_NAME } from "./utils";

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
