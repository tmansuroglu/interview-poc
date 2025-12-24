import "server-only";

import { db } from "../db";
import { records } from "../schema";
import { eq } from "drizzle-orm";

export const deleteRecord = async (recordId: string) =>
  db.delete(records).where(eq(records.id, recordId)).returning();
