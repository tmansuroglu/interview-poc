import { DrizzleQueryError } from "drizzle-orm";
import { PostgresErrorCodes } from "../enums";
import { postgresErrorMessages } from "./postgres-error-messages";
import { DatabaseError } from "@neondatabase/serverless";

function parseConstraintName(constraint: string): string | null {
  // Example: "users_email_key" -> "email"
  // Example: "posts_author_id_fkey" -> "author_id"
  const parts = constraint.split("_");
  if (parts.length >= 2) {
    // Remove table name (first part) and constraint type (last part)
    return parts.slice(1, -1).join("_");
  }
  return null;
}

function enhanceErrorMessage(
  baseMessage: string,
  dbError: DatabaseError
): string {
  const { constraint, column } = dbError;

  // Add specific field name for unique violations
  if (dbError.code === PostgresErrorCodes.UniqueViolation && constraint) {
    const field = parseConstraintName(constraint);

    if (field) {
      // Convert snake_case to readable format
      const readableField = field.replace(/_/g, " ");
      return `This ${readableField} is already registered. Please use a different one.`;
    }
  }

  // Add field name for not null violations
  if (dbError.code === PostgresErrorCodes.NotNullViolation && column) {
    const readableColumn = column.replace(/_/g, " ");
    return `The "${readableColumn}" field is required. Please provide a value.`;
  }

  // Add context for string truncation
  if (dbError.code === PostgresErrorCodes.StringDataRightTruncation && column) {
    const readableColumn = column.replace(/_/g, " ");
    return `Your ${readableColumn} is too long. Please use fewer characters.`;
  }

  // Return base message if no enhancement needed
  return baseMessage;
}

function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof DatabaseError && typeof error.code === "string";
}

export function getDrizzleErrorMessage(error?: unknown): string {
  if (!error) {
    return "We couldn't complete your request. Please try again.";
  }

  // Check if it's a DrizzleQueryError
  if (error instanceof DrizzleQueryError) {
    // Extract the underlying database error from the cause
    const dbError = error.cause;

    if (dbError && isDatabaseError(dbError)) {
      const errorCode = dbError.code as PostgresErrorCodes;
      const customMessage = postgresErrorMessages[errorCode];

      if (customMessage) {
        // Optionally enhance with more context
        return enhanceErrorMessage(customMessage, dbError);
      }

      // Return a generic message for unmapped errors
      return "We encountered an unexpected issue. Please try again or contact support if this continues.";
    }
  }

  // Fallback for unknown errors
  return "We couldn't complete your request. Please try again.";
}
