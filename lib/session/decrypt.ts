import { jwtVerify } from "jose";
import { SessionPayload } from "../types";
import { encodedKey } from "./utils";

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Failed to verify session");
    return null;
  }
}
