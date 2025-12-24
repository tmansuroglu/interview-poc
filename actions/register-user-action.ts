"use server";

import { AuthState } from "@/lib/types";
import { createSession } from "@/lib/session/create-session";
import { redirect, RedirectType } from "next/navigation";
import { PrivateRoutes } from "@/lib/enums";
import { validateAuthFields } from "@/lib/action-utils/validate-auth-fields";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { dbInsertUser } from "@/lib/db/user/db-insert-user";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/firebase-error-messages";
import { DrizzleQueryError } from "drizzle-orm";
import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";

export const registerUserAction = async (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  let shouldRedirect = false;
  try {
    const validationResponse = validateAuthFields(formData);

    if (validationResponse.errors) {
      return {
        success: false,
        message: "Failed to validate form",
        errors: validationResponse.errors,
      };
    }

    const userData = await createUserWithEmailAndPassword(
      auth,
      validationResponse.fields.email,
      validationResponse.fields.password
    );

    await dbInsertUser({
      firebaseUserId: userData.user.uid,
      email: validationResponse.fields.email,
    });

    await createSession(userData.user.uid);

    shouldRedirect = true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        success: false,
        message: getFirebaseAuthErrorMessage(error.code),
      };
    }

    if (error instanceof DrizzleQueryError) {
      return {
        success: false,
        message: getDrizzleErrorMessage(error),
      };
    }

    console.log("Unexpected register error", error);

    return { success: false, message: "Unexpected register error" };
  } finally {
    if (shouldRedirect) {
      redirect(PrivateRoutes.Dashboard, RedirectType.replace);
    }
  }
};
