import "server-only";

import { db } from "../db";
import { records } from "../schema";
import { eq } from "drizzle-orm";

type UpdateRecordOptions = {
  recordId: string;
  name?: string;
  vaccinated?: boolean;
};

export const updateRecord = async ({
  recordId,
  ...updates
}: UpdateRecordOptions) =>
  db.update(records).set(updates).where(eq(records.id, recordId)).returning();
