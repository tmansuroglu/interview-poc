import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { FirebaseAuthErrorCodes } from "../enums";
import { AuthFields } from "../field-names";
import { AuthState } from "../types";
import { registerUser } from "./register-user";

// TODO: handle all auth error cases properly.

type AuthenticateUserOptions = {
  email: string;
  password: string;
};

export const authenticateUser = async ({
  email,
  password,
}: AuthenticateUserOptions): Promise<AuthState> => {
  try {
    const user = (await signInWithEmailAndPassword(auth, email, password)).user;

    return { success: true, user };
  } catch (error) {
    if (!(error instanceof FirebaseError)) {
      return { success: false, message: "Unexpected firebase login error." };
    }

    switch (error.code) {
      case FirebaseAuthErrorCodes.InvalidCredential:
        return registerUser({ email, password });
      case FirebaseAuthErrorCodes.InvalidPassword:
        return {
          success: false,
          errors: { [AuthFields.Password]: ["Wrong password"] },
          message: "Invalid input.",
        };
      default:
        return { success: false, message: "Unexpected login error." };
    }
  }
};
