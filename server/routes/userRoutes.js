const express = require("express");
const { protect } = require("../middleware/auth");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
