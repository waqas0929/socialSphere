import errorCodes from "./errorCodes.js";

const errorHandler = (res, errorCode) => {
  const error = errorCodes[errorCode];
  if (!error) {
    console.error("Unknown error code", errorCode);
    res.status(500).json({ message: "internal server error" });
  }

  if (error) {
    res.status(400).json({ code: error.code, message: error.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default errorHandler;
