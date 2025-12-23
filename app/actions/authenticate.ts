import { authValidationSchema } from "@/lib/field-validations";
import { AuthFields } from "@/lib/field-names";
import { treeifyError } from "zod";
import { AuthState } from "@/lib/types";
import { authenticateUser } from "@/app/lib/firebase/authenticate-user";

export const authAction = async (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  try {
    const validationResult = authValidationSchema.safeParse({
      [AuthFields.Email]: formData.get(AuthFields.Email) as string,
      [AuthFields.Password]: formData.get(AuthFields.Password) as string,
    });

    if (!validationResult.success) {
      const errorTree = treeifyError(validationResult.error);

      return {
        success: false,
        errors: {
          [AuthFields.Email]:
            errorTree.properties?.[AuthFields.Email]?.errors ?? [],
          [AuthFields.Password]:
            errorTree.properties?.[AuthFields.Password]?.errors ?? [],
        },
        message: "Failed to validate the authentication form.",
      };
    }

    return await authenticateUser({
      email: validationResult.data[AuthFields.Email],
      password: validationResult.data[AuthFields.Password],
    });
  } catch {
    return { success: false, message: "Unexpected auth action error" };
  }
};
