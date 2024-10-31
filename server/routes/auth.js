const express = require("express");
const  controller  = require("../controllers/authController");
const {register, login} = require("../validations/auth.validation");
const { validate } = require("express-validation");
const router = express.Router();

router.route("/register").post(validate(register),controller.register);
router.route("/login").post(validate(login),controller.login);
router.route("/logout").post( controller.logout);

module.exports = router;
