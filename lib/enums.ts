export enum AuthFields {
  Email = "email",
  Password = "password",
}

export enum FirebaseAuthErrorCodes {
  ClaimsTooLarge = "auth/claims-too-large",
  EmailAlreadyExists = "auth/email-already-exists",
  IdTokenExpired = "auth/id-token-expired",
  IdTokenRevoked = "auth/id-token-revoked",
  InsufficientPermission = "auth/insufficient-permission",
  InternalError = "auth/internal-error",
  InvalidArgument = "auth/invalid-argument",
  InvalidClaims = "auth/invalid-claims",
  InvalidContinueUri = "auth/invalid-continue-uri",
  InvalidCreationTime = "auth/invalid-creation-time",
  InvalidCredential = "auth/invalid-credential",
  InvalidDisabledField = "auth/invalid-disabled-field",
  InvalidDisplayName = "auth/invalid-display-name",
  InvalidDynamicLinkDomain = "auth/invalid-dynamic-link-domain",
  InvalidEmail = "auth/invalid-email",
  InvalidEmailVerified = "auth/invalid-email-verified",
  InvalidHashAlgorithm = "auth/invalid-hash-algorithm",
  InvalidHashBlockSize = "auth/invalid-hash-block-size",
  InvalidHashDerivedKeyLength = "auth/invalid-hash-derived-key-length",
  InvalidHashKey = "auth/invalid-hash-key",
  InvalidHashMemoryCost = "auth/invalid-hash-memory-cost",
  InvalidHashParallelization = "auth/invalid-hash-parallelization",
  InvalidHashRounds = "auth/invalid-hash-rounds",
  InvalidHashSaltSeparator = "auth/invalid-hash-salt-separator",
  InvalidIdToken = "auth/invalid-id-token",
  InvalidLastSignInTime = "auth/invalid-last-sign-in-time",
  InvalidPageToken = "auth/invalid-page-token",
  InvalidPassword = "auth/invalid-password",
  InvalidPasswordHash = "auth/invalid-password-hash",
  InvalidPasswordSalt = "auth/invalid-password-salt",
  InvalidPhoneNumber = "auth/invalid-phone-number",
  InvalidPhotoUrl = "auth/invalid-photo-url",
  InvalidProviderData = "auth/invalid-provider-data",
  InvalidProviderId = "auth/invalid-provider-id",
  InvalidOauthResponseType = "auth/invalid-oauth-responsetype",
  InvalidSessionCookieDuration = "auth/invalid-session-cookie-duration",
  InvalidUid = "auth/invalid-uid",
  InvalidUserImport = "auth/invalid-user-import",
  MaximumUserCountExceeded = "auth/maximum-user-count-exceeded",
  MissingAndroidPkgName = "auth/missing-android-pkg-name",
  MissingContinueUri = "auth/missing-continue-uri",
  MissingHashAlgorithm = "auth/missing-hash-algorithm",
  MissingIosBundleId = "auth/missing-ios-bundle-id",
  MissingUid = "auth/missing-uid",
  MissingOauthClientSecret = "auth/missing-oauth-client-secret",
  OperationNotAllowed = "auth/operation-not-allowed",
  PhoneNumberAlreadyExists = "auth/phone-number-already-exists",
  ProjectNotFound = "auth/project-not-found",
  ReservedClaims = "auth/reserved-claims",
  SessionCookieExpired = "auth/session-cookie-expired",
  SessionCookieRevoked = "auth/session-cookie-revoked",
  TooManyRequests = "auth/too-many-requests",
  UidAlreadyExists = "auth/uid-already-exists",
  UnauthorizedContinueUri = "auth/unauthorized-continue-uri",
  UserDisabled = "auth/user-disabled",
  UserNotFound = "auth/user-not-found",
}

export enum PostgresErrorCodes {
  // Class 23 — Integrity Constraint Violation
  UniqueViolation = "23505",
  ForeignKeyViolation = "23503",
  NotNullViolation = "23502",
  CheckViolation = "23514",

  // Class 22 — Data Exception
  InvalidTextRepresentation = "22P02",
  StringDataRightTruncation = "22001",
  NumericValueOutOfRange = "22003",
  InvalidDatetimeFormat = "22007",

  // Class 42 — Syntax Error or Access Rule Violation
  UndefinedTable = "42P01",
  UndefinedColumn = "42703",

  // Other Common Errors
  ConnectionFailure = "08006",
  ConnectionDoesNotExist = "08003",
  InvalidTransactionState = "25000",
}

export enum PublicRoutes {
  Home = "/",
  Login = "/login",
  Register = "/register",
}

export enum PrivateRoutes {
  Dashboard = "/dashboard",
}
