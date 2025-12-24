"use server";

import { AuthState } from "@/lib/types";
import { createSession } from "@/lib/session/create-session";
import { redirect, RedirectType } from "next/navigation";
import { PrivateRoutes } from "@/lib/enums";
import { validateAuthFields } from "@/lib/action-utils/validate-auth-fields";
import { FirebaseError } from "firebase/app";
import { DrizzleQueryError } from "drizzle-orm";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { dbLoginUser } from "@/lib/db/user/db-login-user";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/firebase-error-messages";
import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";

export const loginUserAction = async (
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

    const userData = await signInWithEmailAndPassword(
      auth,
      validationResponse.fields.email,
      validationResponse.fields.password
    );

    await dbLoginUser({ firebaseUserId: userData.user.uid });

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

    return { success: false, message: "Unexpected login error" };
  } finally {
    if (shouldRedirect) {
      redirect(PrivateRoutes.Dashboard, RedirectType.replace);
    }
  }
};
