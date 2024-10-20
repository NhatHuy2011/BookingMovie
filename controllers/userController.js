const userService = require("../services/userService");

// Hàm lấy danh sách người dùng
const getAllUsers = async (req, res) => {
  try {
    // Gọi service để lấy danh sách user
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm lấy thông tin người dùng
const getProfile = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ `req.user` (đã được middleware `protect` thêm vào)
    const user = req.user;

    // Trả về thông tin người dùng, trừ mật khẩu
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: "Cannot get user profile" });
  }
};

// Hàm cập nhật thông tin người dùng
const updateProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Gọi service để cập nhật thông tin người dùng
    const updatedUser = await userService.updateUserProfile(
      req.user._id,
      username,
      email
    );
    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hàm xóa người dùng
const banUser = async (req, res) => {
  try {
    // Gọi service để xóa user
    const result = await userService.banUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  banUser,
};
