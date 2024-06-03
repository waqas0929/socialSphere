import errorCodes from "./errorCodes.js";

const errorHandler = (res, errorCode, data = null) => {
  const error = errorCodes[errorCode];
  if (!error) {
    console.error("Unknown error code", errorCode);
    return res.status(400).json({ code: "INVALID_ERROR_CODE", message: "Invalid error code provided" });
  }

  const response = { code: error.code, message: error.message };
  if (data) {
    response.data = data;
  }

  return res.status(error.status).json(response);
};

export default errorHandler;
