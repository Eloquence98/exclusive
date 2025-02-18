const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiResponse = require("../utils/apiResponse");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return ApiResponse.error(res, "Not authorized", 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return ApiResponse.error(res, "Not authorized", 401);
  }
};
