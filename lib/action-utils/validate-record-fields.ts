import { treeifyError } from "zod";
import { recordValidationSchema } from "../validation-rules";
import { RecordFields } from "../enums";

type ValidateRecordFieldsResponseType =
  | {
      fields: null;
      errors: { name: string[]; isVaccinated: string[] };
    }
  | { errors: null; fields: { name: string; isVaccinated: boolean } };

export const validateRecordFields = (
  formData: FormData
): ValidateRecordFieldsResponseType => {
  const validationResult = recordValidationSchema.safeParse({
    [RecordFields.Name]: formData.get(RecordFields.Name) as string,
    [RecordFields.IsVaccinated]:
      formData.get(RecordFields.IsVaccinated) === "on" ? true : false,
  });

  if (validationResult.success) {
    return {
      fields: {
        name: validationResult.data.name,
        isVaccinated: validationResult.data.isVaccinated,
      },
      errors: null,
    };
  }

  const errorTree = treeifyError(validationResult.error);

  return {
    fields: null,
    errors: {
      [RecordFields.Name]:
        errorTree.properties?.[RecordFields.Name]?.errors ?? [],
      [RecordFields.IsVaccinated]:
        errorTree.properties?.[RecordFields.IsVaccinated]?.errors ?? [],
    },
  };
};
