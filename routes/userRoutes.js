const express = require("express");
const userController = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route lấy danh sách người dùng, chỉ cho phép ADMIN
router.get("/all", protect, admin, userController.getAllUsers);

// Route lấy thông tin người dùng, user đang login
router.get("/profile", protect, userController.getProfile);

// Route cập nhật thông tin người dùng, user đang login
router.put("/profile", protect, userController.updateProfile);

// Route ban người dùng, chỉ cho phép ADMIN
router.put("/:id", protect, admin, userController.banUser);

module.exports = router;
