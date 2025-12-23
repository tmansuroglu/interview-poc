"use server";
// TODO: handle all firebase and drizzle auth error cases properly.

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { FirebaseAuthErrorCodes } from "../enums";
import { AuthFields } from "../field-names";
import { dbInsertUser } from "../db/user/db-insert-user";

type RegisterUserOptions = {
  email: string;
  password: string;
};

export const registerUser = async ({
  email,
  password,
}: RegisterUserOptions) => {
  try {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await dbInsertUser({
      firebaseUserId: userData.user.uid,
      email,
    });

    return { success: true };
  } catch (error) {
    if (!(error instanceof FirebaseError)) {
      return { success: false, message: "Unexpected firebase register error." };
    }

    if (error.code === FirebaseAuthErrorCodes.EmailAlreadyExists) {
      return {
        success: false,
        errors: {
          [AuthFields.Email]: ["Email already in use"],
        },
        message: "Invalid input.",
      };
    }

    return { success: false, message: "Unexpected register error." };
  }
};
