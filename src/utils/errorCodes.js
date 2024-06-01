const errorCodes = {
  //user related error
  USER_NOT_FOUND: { code: 404, message: "User not found" },
  INVALID_CREDENTIALS: { code: 404, message: "Invalid credential" },
  EMAIL_NOT_VERIFIED: { code: 403, message: "Email not verified" },
  PASSWORD_RESET_FAILED: { code: 400, message: "Password reset failed" },
  EMAIL_ALREADY_EXIST: { CODE: 409, message: "email already exist" },
  USER_REGISTER_SUCCESSFULLY: {code: 200, message: 'user register successfully'},
  UPDATE_USER_SUCCESSFULLY: {code: 200, message: 'Update user successfully'},
  USER_DELETED_SUCCESSFULLY: {code: 200, message: 'Deleted user successfully'},
  EMAIL_VERIFICATION_FAILED: {code: 500,message: "Email verification failed"},

  // Token related errors
  TOKEN_EXPIRED: { code: 401, message: "Token expired" },
  TOKEN_INVALID: { code: 401, message: "Invalid token" },

  // Database related errors
  DB_CONNECTION_FAILED: { code: 500, message: "Database connection failed" },
  DB_QUERY_FAILED: { code: 500, message: "Database query failed" },

  // Validation errors
  VALIDATION_ERROR: { code: 400, message: "Validation error" },

  // General errors
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal server error" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
};

export default errorCodes;
