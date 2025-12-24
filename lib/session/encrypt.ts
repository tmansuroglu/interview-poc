import { SignJWT } from "jose";
import { SessionPayload } from "../types";
import { encodedKey } from "./utils";

type EncryptOptions = { payload: SessionPayload; expiresAtInSeconds: number };

export async function encrypt({ payload, expiresAtInSeconds }: EncryptOptions) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAtInSeconds)
    .sign(encodedKey);
}
