const express = require("express");
const controller= require("../controllers/user.controller");
const {createUser}=require("../validations/users.validation")
const { authenticate, isAdmin } = require("../middlewares/auth.middleware");
const {productImageUpload} = require("../middlewares/product.middleware");
const { validate } = require("express-validation");

const router = express.Router();
// router.route("/").post(authenticate,isAdmin,validate(createUser),controller.createUser);
router.route("/").post(validate(createUser),controller.createUser);

router.route("/").get(authenticate,isAdmin,controller.getAllUsers);
// router.get("/", getAllUsers);
router.route("/:id").get(authenticate,isAdmin,controller.getUserById);
router.route("/:id").put(authenticate,isAdmin,validate(createUser),controller.updateUser);
router.route("/:id").delete(authenticate,isAdmin,controller.deleteUser);
module.exports = router;
