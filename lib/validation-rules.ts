import {
  string as zodString,
  email as zodEmail,
  object as zodObject,
  boolean as zodBoolean,
} from "zod";
import { AuthFields, RecordFields } from "./enums";

export const AUTH_FIELDS_VALIDATION_RULES = {
  [AuthFields.Email]: {
    minLength: { value: 10, message: "Email must be at least 10 characters." },
    maxLength: {
      value: 100,
      message: "Email must shorter than 100 characters.",
    },
  },
  [AuthFields.Password]: {
    minLength: { value: 8, message: "Password must be at least 8 characters." },
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
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].minLength.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].minLength.message
    )
    .max(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].maxLength.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Email].maxLength.message
    ),
  [AuthFields.Password]: zodString()
    .trim()
    .min(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].minLength.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].minLength.message
    )
    .max(
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].maxLength.value,
      AUTH_FIELDS_VALIDATION_RULES[AuthFields.Password].maxLength.message
    ),
});

export const RECORD_FIELDS_VALIDATION_RULES = {
  [RecordFields.Name]: {
    minLength: { value: 1, message: "Name must be at least 1 characters." },
    maxLength: {
      value: 100,
      message: "Name must shorter than 100 characters.",
    },
  },
};

// TODO: improve validation for safety
export const recordValidationSchema = zodObject({
  [RecordFields.Name]: zodString()
    .trim()
    .min(
      RECORD_FIELDS_VALIDATION_RULES[RecordFields.Name].minLength.value,
      RECORD_FIELDS_VALIDATION_RULES[RecordFields.Name].minLength.message
    )
    .max(
      RECORD_FIELDS_VALIDATION_RULES[RecordFields.Name].maxLength.value,
      RECORD_FIELDS_VALIDATION_RULES[RecordFields.Name].maxLength.message
    ),
  [RecordFields.IsVaccinated]: zodBoolean(),
});
