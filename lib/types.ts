export type AuthState = {
  success: boolean;
  errors?: { email?: string[]; password?: string[] };
  message?: string;
} | null;

export type SessionPayload = {
  firebaseUserId: string;
};

export type InsertRecordState = {
  success: boolean;
  errors?: { name?: string[]; isVaccinated?: string[] };
  message?: string;
  resetId?: string;
} | null;

export type GetAllRecordsState = {
  success: boolean;
  message?: string;
  records?: { name: string; count: number }[];
} | null;
