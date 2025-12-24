import {
  string as zodString,
  email as zodEmail,
  object as zodObject,
} from "zod";
import { AuthFields } from "./enums";

export const AUTH_FIELDS_VALIDATION_RULES = {
  [AuthFields.Email]: {
    minLenght: { value: 10, message: "Email must be at least 10 characters." },
    maxLength: {
      value: 100,
      message: "Email must shorter than 100 characters.",
    },
  },
  [AuthFields.Password]: {
    minLenght: { value: 8, message: "Password must be at least 8 characters." },
    maxLength: {
      value: 100,
      message: "Password must shorter than 100 characters.",
    },
  },
};

// TODO: improve validation for safety
export const authValidationSchema = zodObject({
  [AuthFields.Email]: zodEmail()
    .trim()
    .min(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].minLenght.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].minLenght.message
    )
    .max(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].maxLength.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].maxLength.message
    ),
  [AuthFields.Password]: zodString()
    .trim()
    .min(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].minLenght.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].minLenght.message
    )
    .max(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].maxLength.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].maxLength.message
    ),
});
