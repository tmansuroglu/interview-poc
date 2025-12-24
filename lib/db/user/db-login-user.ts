import "server-only";

import { db } from "../db";
import { users } from "../schema";
import { eq } from "drizzle-orm";

type LoginUserOptions = { firebaseUserId: string };

export const dbLoginUser = async ({ firebaseUserId }: LoginUserOptions) =>
  await db
    .update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, firebaseUserId));
