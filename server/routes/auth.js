const express = require("express");
const { register, login, logout } = require("../controllers/authController");
// const {register1} = require("../validations/auth.validation");
// const { validate } = require("express-validation");
const router = express.Router();

router.post("/register", register);
// router.route("/register").post(validate(register1),register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
