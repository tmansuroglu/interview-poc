"use server";

import { AuthState } from "@/lib/types";
import { createSession } from "@/lib/session/create-session";
import { redirect, RedirectType } from "next/navigation";
import { PrivateRoutes } from "@/lib/enums";
import { validateAuthFields } from "@/lib/action-utils/validate-auth-fields";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/firebase-error-messages";
import { DrizzleQueryError } from "drizzle-orm";
import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";
import { insertUser } from "@/lib/db/user/insert-user";

export const registerUserAction = async (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
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

    await insertUser({
      firebaseUserId: userData.user.uid,
      email: validationResponse.fields.email,
    });

    await createSession(userData.user.uid);

    throw Error("redirect");
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

    if (error instanceof Error && error.message === "redirect") {
      redirect(PrivateRoutes.Dashboard, RedirectType.replace);
    }

    return { success: false, message: "Unexpected register error" };
  }
};
