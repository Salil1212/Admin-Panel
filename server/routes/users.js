const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", authenticate, isAdmin, createUser);
router.get("/", authenticate, isAdmin, getAllUsers);
// router.get("/", getAllUsers);
router.get("/:id", authenticate, isAdmin, getUserById);
router.put("/:id", authenticate, isAdmin, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

module.exports = router;
