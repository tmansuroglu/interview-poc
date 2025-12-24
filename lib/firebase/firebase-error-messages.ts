import { FirebaseAuthErrorCodes } from "../enums";

export const firebaseAuthErrorMessages: Record<FirebaseAuthErrorCodes, string> =
  {
    [FirebaseAuthErrorCodes.ClaimsTooLarge]:
      "Your account information is too large to process.",
    [FirebaseAuthErrorCodes.EmailAlreadyExists]:
      "An account with this email already exists.",
    [FirebaseAuthErrorCodes.EmailAlreadyInUse]:
      "An account with this email already exists.",
    [FirebaseAuthErrorCodes.IdTokenExpired]:
      "Your session has expired. Please sign in again.",
    [FirebaseAuthErrorCodes.IdTokenRevoked]:
      "Your session is no longer valid. Please sign in again.",
    [FirebaseAuthErrorCodes.InsufficientPermission]:
      "You don’t have permission to perform this action.",
    [FirebaseAuthErrorCodes.InternalError]:
      "Something went wrong on our end. Please try again later.",
    [FirebaseAuthErrorCodes.InvalidArgument]:
      "Invalid information was provided.",
    [FirebaseAuthErrorCodes.InvalidClaims]:
      "Your account permissions are invalid.",
    [FirebaseAuthErrorCodes.InvalidContinueUri]:
      "The requested link is invalid.",
    [FirebaseAuthErrorCodes.InvalidCreationTime]:
      "Invalid account creation time.",
    [FirebaseAuthErrorCodes.InvalidCredential]: "Invalid login credentials.",
    [FirebaseAuthErrorCodes.InvalidDisabledField]: "Invalid account status.",
    [FirebaseAuthErrorCodes.InvalidDisplayName]:
      "The display name is not valid.",
    [FirebaseAuthErrorCodes.InvalidDynamicLinkDomain]:
      "Invalid authentication link.",
    [FirebaseAuthErrorCodes.InvalidEmail]:
      "Please enter a valid email address.",
    [FirebaseAuthErrorCodes.InvalidEmailVerified]:
      "Email verification status is invalid.",
    [FirebaseAuthErrorCodes.InvalidHashAlgorithm]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashBlockSize]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashDerivedKeyLength]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashKey]: "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashMemoryCost]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashParallelization]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashRounds]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidHashSaltSeparator]:
      "Invalid security configuration.",
    [FirebaseAuthErrorCodes.InvalidIdToken]:
      "Your session is invalid. Please sign in again.",
    [FirebaseAuthErrorCodes.InvalidLastSignInTime]:
      "Invalid last sign-in time.",
    [FirebaseAuthErrorCodes.InvalidPageToken]: "Invalid request token.",
    [FirebaseAuthErrorCodes.InvalidPassword]:
      "The password is incorrect or too weak.",
    [FirebaseAuthErrorCodes.InvalidPasswordHash]:
      "Invalid password configuration.",
    [FirebaseAuthErrorCodes.InvalidPasswordSalt]:
      "Invalid password configuration.",
    [FirebaseAuthErrorCodes.InvalidPhoneNumber]:
      "Please enter a valid phone number.",
    [FirebaseAuthErrorCodes.InvalidPhotoUrl]:
      "The profile photo URL is invalid.",
    [FirebaseAuthErrorCodes.InvalidProviderData]:
      "Invalid sign-in provider information.",
    [FirebaseAuthErrorCodes.InvalidProviderId]:
      "Invalid authentication provider.",
    [FirebaseAuthErrorCodes.InvalidOauthResponseType]:
      "Invalid authentication response.",
    [FirebaseAuthErrorCodes.InvalidSessionCookieDuration]:
      "Invalid session duration.",
    [FirebaseAuthErrorCodes.InvalidUid]: "Invalid user identifier.",
    [FirebaseAuthErrorCodes.InvalidUserImport]: "Failed to import user data.",
    [FirebaseAuthErrorCodes.MaximumUserCountExceeded]:
      "The maximum number of users has been reached.",
    [FirebaseAuthErrorCodes.MissingAndroidPkgName]:
      "Android package name is missing.",
    [FirebaseAuthErrorCodes.MissingContinueUri]:
      "Required redirect information is missing.",
    [FirebaseAuthErrorCodes.MissingHashAlgorithm]:
      "Missing security configuration.",
    [FirebaseAuthErrorCodes.MissingIosBundleId]: "iOS bundle ID is missing.",
    [FirebaseAuthErrorCodes.MissingUid]: "User identifier is missing.",
    [FirebaseAuthErrorCodes.MissingOauthClientSecret]:
      "Authentication configuration is incomplete.",
    [FirebaseAuthErrorCodes.OperationNotAllowed]:
      "This operation is not allowed.",
    [FirebaseAuthErrorCodes.PhoneNumberAlreadyExists]:
      "An account with this phone number already exists.",
    [FirebaseAuthErrorCodes.ProjectNotFound]:
      "Authentication project not found.",
    [FirebaseAuthErrorCodes.ReservedClaims]: "Invalid account permissions.",
    [FirebaseAuthErrorCodes.SessionCookieExpired]:
      "Your session has expired. Please sign in again.",
    [FirebaseAuthErrorCodes.SessionCookieRevoked]:
      "Your session is no longer valid.",
    [FirebaseAuthErrorCodes.TooManyRequests]:
      "Too many attempts. Please try again later.",
    [FirebaseAuthErrorCodes.UidAlreadyExists]:
      "An account with this user ID already exists.",
    [FirebaseAuthErrorCodes.UnauthorizedContinueUri]:
      "Unauthorized redirect URL.",
    [FirebaseAuthErrorCodes.UserDisabled]: "This account has been disabled.",
    [FirebaseAuthErrorCodes.UserNotFound]:
      "No account was found with these details.",
  };

/**
 * Converts a Firebase auth error code into a user-friendly message.
 */
export function getFirebaseAuthErrorMessage(errorCode?: string): string {
  console.log("errorCode", errorCode);
  if (!errorCode) {
    return "Something went wrong. Please try again.";
  }

  return (
    firebaseAuthErrorMessages[errorCode as FirebaseAuthErrorCodes] ??
    "Something went wrong. Please try again."
  );
}
