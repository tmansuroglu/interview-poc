"use server";

import { deleteSession } from "@/lib/session/delete-session";

export const logoutUserAction = async () => {
  await deleteSession();
};
