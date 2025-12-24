export type AuthState = {
  success: boolean;
  errors?: { email?: string[]; password?: string[] };
  message?: string;
} | null;

export type SessionPayload = {
  firebaseUserId: string;
};
