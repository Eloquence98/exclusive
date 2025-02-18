const UserService = require("../services/userService");
const ApiResponse = require("../utils/apiResponse");

exports.register = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    ApiResponse.success(res, user, "User registered successfully", 201);
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }
    ApiResponse.success(res, { user }, "Login successful");
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};
