const errorCodes = {
  // User related errors
  USER_NOT_FOUND: { status: 404, code: "USER_NOT_FOUND", message: "User not found" },
  INVALID_CREDENTIALS: { status: 401, code: "INVALID_CREDENTIALS", message: "Invalid credentials" },
  EMAIL_NOT_VERIFIED: { status: 403, code: "EMAIL_NOT_VERIFIED", message: "Email not verified" },
  PASSWORD_RESET_FAILED: { status: 400, code: "PASSWORD_RESET_FAILED", message: "Password reset failed" },
  EMAIL_ALREADY_EXIST: { status: 409, code: "EMAIL_ALREADY_EXIST", message: "Email already exists" },
  USER_REGISTER_SUCCESSFULLY: { status: 201, code: 'USER_REGISTER_SUCCESSFULLY', message: 'User registered successfully' },
  UPDATE_USER_SUCCESSFULLY: { status: 200, code: 'UPDATE_USER_SUCCESSFULLY', message: 'User updated successfully' },
  USER_DELETED_SUCCESSFULLY: { status: 200, code: 'USER_DELETED_SUCCESSFULLY', message: 'User deleted successfully' },
  EMAIL_VERIFICATION_FAILED: { status: 500, code: "EMAIL_VERIFICATION_FAILED", message: "Email verification failed" },

  // Token related errors
  TOKEN_EXPIRED: { status: 401, code: "TOKEN_EXPIRED", message: "Token expired" },
  TOKEN_INVALID: { status: 401, code: "TOKEN_INVALID", message: "Invalid token" },

  // Database related errors
  DB_CONNECTION_FAILED: { status: 500, code: "DB_CONNECTION_FAILED", message: "Database connection failed" },
  DB_QUERY_FAILED: { status: 500, code: "DB_QUERY_FAILED", message: "Database query failed" },

  // Validation errors
  VALIDATION_ERROR: { status: 400, code: "VALIDATION_ERROR", message: "Validation error" },

  // General errors
  INTERNAL_SERVER_ERROR: { status: 500, code: "INTERNAL_SERVER_ERROR", message: "Internal server error" },
  FORBIDDEN: { status: 403, code: "FORBIDDEN", message: "Forbidden" },

  // Query parameter error
  QUERY_PARAMETER_IS_REQUIRED: {
    status: 400, code: "QUERY_PARAMETER_REQUIRED", message: "Query parameter is required"
  },

  // Custom error codes
  DATABASE_ERROR: { status: 500, code: 'DB001', message: 'Database error' },
  EMAIL_SENDING_ERROR: { status: 500, code: 'EMAIL001', message: 'Error sending email' }
};

export default errorCodes;
