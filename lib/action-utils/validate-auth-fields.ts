import { treeifyError } from "zod";
import { authValidationSchema } from "../validation-rules";
import { AuthFields } from "../enums";

type ValidateAuthFieldsResponseType =
  | {
      fields: null;
      errors: { email: string[]; password: string[] };
    }
  | { errors: null; fields: { email: string; password: string } };

export const validateAuthFields = (
  formData: FormData
): ValidateAuthFieldsResponseType => {
  const validationResult = authValidationSchema.safeParse({
    [AuthFields.Email]: formData.get(AuthFields.Email) as string,
    [AuthFields.Password]: formData.get(AuthFields.Password) as string,
  });

  if (validationResult.success) {
    return {
      fields: {
        email: validationResult.data.email,
        password: validationResult.data.password,
      },
      errors: null,
    };
  }

  const errorTree = treeifyError(validationResult.error);

  return {
    fields: null,
    errors: {
      [AuthFields.Email]:
        errorTree.properties?.[AuthFields.Email]?.errors ?? [],
      [AuthFields.Password]:
        errorTree.properties?.[AuthFields.Password]?.errors ?? [],
    },
  };
};
