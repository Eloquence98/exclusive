const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/apiResponse");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, errors.array(), 400);
  }
  next();
};

module.exports = validate;
