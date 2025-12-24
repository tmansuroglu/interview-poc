"use server";

import { validateRecordFields } from "@/lib/action-utils/validate-record-fields";
import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";
import { insertRecord } from "@/lib/db/record/insert-record";
import { PrivateRoutes, PublicRoutes } from "@/lib/enums";
import { verifySession } from "@/lib/session/verify-session";
import { InsertRecordState } from "@/lib/types";
import { DrizzleQueryError } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { logoutUserAction } from "../auth/logout-user-action";
import { redirect, RedirectType } from "next/navigation";

export const insertRecordAction = async (
  prevState: InsertRecordState,
  formData: FormData
): Promise<InsertRecordState> => {
  try {
    const validationResponse = validateRecordFields(formData);

    if (validationResponse.errors) {
      return {
        success: false,
        message: "Failed to validate form",
        errors: validationResponse.errors,
        resetId: prevState?.resetId,
      };
    }

    const { firebaseUserId } = await verifySession();

    if (!firebaseUserId) {
      throw Error("logout");
    }

    await insertRecord({
      id: crypto.randomUUID(),
      name: validationResponse.fields.name,
      vaccinated: validationResponse.fields.isVaccinated,
      recordedByUserId: firebaseUserId,
    });

    revalidatePath(PrivateRoutes.Dashboard);
    return { success: true, resetId: crypto.randomUUID() };
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      return {
        success: false,
        message: getDrizzleErrorMessage(error),
        resetId: prevState?.resetId,
      };
    }

    if (error instanceof Error && error.message === "logout") {
      await logoutUserAction();
      redirect(PublicRoutes.Login, RedirectType.replace);
    }

    console.log("Unexpected insert record error", error);

    return {
      success: false,
      message: "Unexpected insert record error",
      resetId: prevState?.resetId,
    };
  }
};
