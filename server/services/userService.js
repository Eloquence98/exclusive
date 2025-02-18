const User = require("../models/userModel");

class UserService {
  static async createUser(userData) {
    return await User.create(userData);
  }

  static async findUserByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }
}

module.exports = UserService;
