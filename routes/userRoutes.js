const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

const router = express.Router();

// Route lấy danh sách người dùng, chỉ cho phép ADMIN
router.get("/all", protect, admin, userController.getAllUsers);

// Route lấy thông tin người dùng, yêu cầu xác thực với middleware 'protect'
router.get("/profile", protect, userController.getProfile);

// Route cập nhật thông tin người dùng, yêu cầu xác thực với middleware 'protect'
router.put("/profile", protect, userController.updateProfile);

// Route xóa người dùng, chỉ cho phép ADMIN, yêu cầu xác thực với middleware 'protect' và 'admin'
router.put("/:id", protect, admin, userController.banUser);

module.exports = router;
