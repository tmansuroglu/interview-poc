"use server";

import { validateRecordFields } from "@/lib/action-utils/validate-record-fields";
import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";
import { insertRecord } from "@/lib/db/record/insert-record";
import { CookieErrors } from "@/lib/enums";
import { verifySession } from "@/lib/session/verify-session";
import { InsertRecordState } from "@/lib/types";
import { DrizzleQueryError } from "drizzle-orm";

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
      throw new Error(CookieErrors.InvalidSession);
    }

    await insertRecord({
      id: crypto.randomUUID(),
      name: validationResponse.fields.name,
      vaccinated: validationResponse.fields.isVaccinated,
      recordedByUserId: firebaseUserId,
    });

    return { success: true, resetId: crypto.randomUUID() };
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      return {
        success: false,
        message: getDrizzleErrorMessage(error),
        resetId: prevState?.resetId,
      };
    }

    console.log("Unexpected insert record error", error);

    return {
      success: false,
      message: "Unexpected insert record error",
      resetId: prevState?.resetId,
    };
  }
};
