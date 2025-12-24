import { PostgresErrorCodes } from "../enums";

export const postgresErrorMessages: Record<PostgresErrorCodes, string> = {
  [PostgresErrorCodes.UniqueViolation]:
    "This information is already in use. Please try a different value.",
  [PostgresErrorCodes.ForeignKeyViolation]:
    "Unable to complete this action because the related information no longer exists. Please refresh and try again.",
  [PostgresErrorCodes.NotNullViolation]:
    "Please fill in all required fields before continuing.",
  [PostgresErrorCodes.CheckViolation]:
    "The information you entered doesn't meet our requirements. Please check your input and try again.",
  [PostgresErrorCodes.InvalidTextRepresentation]:
    "We couldn't process the information you entered. Please check the format and try again.",
  [PostgresErrorCodes.StringDataRightTruncation]:
    "The text you entered is too long. Please shorten it and try again.",
  [PostgresErrorCodes.NumericValueOutOfRange]:
    "The number you entered is outside the acceptable range. Please enter a valid number.",
  [PostgresErrorCodes.InvalidDatetimeFormat]:
    "The date or time format isn't recognized. Please use a valid format (e.g., MM/DD/YYYY).",
  [PostgresErrorCodes.UndefinedTable]:
    "We encountered a technical issue. Please contact support if this continues.",
  [PostgresErrorCodes.UndefinedColumn]:
    "We encountered a technical issue. Please contact support if this continues.",
  [PostgresErrorCodes.ConnectionFailure]:
    "We're having trouble connecting to our servers. Please check your internet connection and try again.",
  [PostgresErrorCodes.ConnectionDoesNotExist]:
    "Your connection was interrupted. Please refresh the page and try again.",
  [PostgresErrorCodes.InvalidTransactionState]:
    "This action couldn't be completed. Please try again.",
};
