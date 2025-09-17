const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-Controllers");
const signupSchema = require("../validators/auth-Validator");
const validate = require("../middleware/validate-Middleware");
const authMiddleware = require("../middleware/auth-Middleware");

// This file contains router logic

router.route("/").get(authController.home);

router.route("/register").post( validate(signupSchema), authController.register);

router.route("/login").post(authController.login);

router.route("/validate").post(authController.login);

router.route("/user").get(authMiddleware, authController.user);

module.exports = router;