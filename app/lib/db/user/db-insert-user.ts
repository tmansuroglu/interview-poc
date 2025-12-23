"use server";

import { db } from "../db";
import { users } from "../schema";

type InsertUserOptions = { firebaseUserId: string; email: string };

export const dbInsertUser = async ({
  firebaseUserId,
  email,
}: InsertUserOptions) =>
  db.insert(users).values({
    id: firebaseUserId,
    email,
    lastLoginAt: new Date(),
  });
