export type AuthState = {
  success: boolean;
  errors?: { email?: string[]; password?: string[] };
  message?: string;
} | null;
