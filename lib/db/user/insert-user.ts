import "server-only";

import { db } from "../db";
import { users } from "../schema";

type InsertUserOptions = { firebaseUserId: string; email: string };

export const insertUser = async ({
  firebaseUserId,
  email,
}: InsertUserOptions) =>
  db.insert(users).values({
    id: firebaseUserId,
    email,
    lastLoginAt: new Date(),
  });
