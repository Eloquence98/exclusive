const logger = require("../utils/logger");
const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === "ValidationError") {
    return ApiResponse.error(res, err.message, 400);
  }

  if (err.code === 11000) {
    return ApiResponse.error(res, "Duplicate field value entered", 400);
  }

  ApiResponse.error(res, err.message || "Server Error", err.statusCode || 500);
};

module.exports = errorHandler;
