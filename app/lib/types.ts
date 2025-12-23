import { User } from "firebase/auth";

export type AuthState = {
  success: boolean;
  errors?: { email?: string[]; password?: string[] };
  message?: string;
  user?: User;
} | null;
