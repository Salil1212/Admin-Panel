const express = require("express");
const controller= require("../controllers/userController");
const {createUser}=require("../validations/users.validation")
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
const { validate } = require("express-validation");

const router = express.Router();
router.route("/").post(authenticate,isAdmin,validate(createUser),controller.createUser);
router.route("/").get(authenticate,isAdmin,controller.getAllUsers);
// router.get("/", getAllUsers);
router.route("/:id").get(authenticate,isAdmin,controller.getUserById);
router.route("/:id").put(authenticate,isAdmin,controller.updateUser);
router.route("/:id").delete(authenticate,isAdmin,controller.deleteUser);

module.exports = router;
