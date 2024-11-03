const express = require("express");
const  controller  = require("../controllers/auth.controller.js");
const {register, login} = require("../validations/auth.validation");
const { validate } = require("express-validation");
const router = express.Router();

router.route("/register").post(controller.register);
router.route("/login").post(validate(login),controller.login);
router.route("/logout").post(controller.logout);
router.route("/request-otp").post(controller.requestOtp);
router.route("/verify-otp").post(controller.verifyOtp);

module.exports = router;
