import "server-only";

import { db } from "../db";
import { records } from "../schema";

export const getAllRecords = async ({}) => db.select().from(records);
