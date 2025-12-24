"use server";

import { deleteSession } from "@/lib/session/delete-session";

export const logoutUserAction = async () => {
  try {
    await deleteSession();
  } catch (err) {
    console.error("Logout failed", err);
  }
};
