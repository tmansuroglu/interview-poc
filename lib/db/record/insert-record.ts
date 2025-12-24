import "server-only";

import { db } from "../db";
import { records } from "../schema";

type InsertRecordOptions = {
  id: string;
  name: string;
  vaccinated: boolean;
  recordedByUserId: string;
};

export const insertRecord = async (input: InsertRecordOptions) =>
  db.insert(records).values(input).returning();
