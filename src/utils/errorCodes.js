const errorCodes = {
  // User related errors
  USER_NOT_FOUND: { status: 404, message: "User not found" },
  INVALID_CREDENTIALS: { status: 401, message: "Invalid credentials" },
  EMAIL_NOT_VERIFIED: { status: 403, message: "Email not verified" },
  ACCOUNT_LOCKED: {
    status: 403,
    message: "Account locked try after 5 minutes",
  },
  ACCOUNT_PERMANENTLY_LOCKED: {
    status: 403,
    message: "Account permanently locked",
  },
  PASSWORD_RESET_FAILED: { status: 400, message: "Password reset failed" },
  EMAIL_ALREADY_EXIST: { status: 409, message: "Email already exists" },
  USER_REGISTER_SUCCESSFULLY: {
    status: 201,
    message: "User registered successfully",
  },
  UPDATE_USER_SUCCESSFULLY: {
    status: 200,
    message: "User updated successfully",
  },
  USER_DELETED_SUCCESSFULLY: {
    status: 200,
    message: "User deleted successfully",
  },
  EMAIL_VERIFICATION_FAILED: {
    status: 500,
    message: "Email verification failed",
  },

  // Token related errors
  TOKEN_EXPIRED: { status: 401, message: "Token expired" },
  TOKEN_INVALID: { status: 401, message: "Invalid token" },

  // Database related errors
  DB_CONNECTION_FAILED: { status: 500, message: "Database connection failed" },
  DB_QUERY_FAILED: { status: 500, message: "Database query failed" },

  // Validation errors
  VALIDATION_ERROR: { status: 400, message: "Validation error" },

  // General errors
  INTERNAL_SERVER_ERROR: { status: 500, message: "Internal server error" },
  FORBIDDEN: { status: 403, message: "Forbidden" },

  // Query parameter error
  QUERY_PARAMETER_IS_REQUIRED: {
    status: 400,
    message: "Query parameter is required",
  },

  // Custom error codes
  DATABASE_ERROR: { status: 500, message: "Database error" },
  EMAIL_SENDING_ERROR: { status: 500, message: "Error sending email" },
};

export default errorCodes;
