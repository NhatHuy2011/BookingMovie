const User = require("../models/User");

// Hàm lấy danh sách người dùng trong service
const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const updateUserProfile = async (userId, username, email) => {
  // Tìm người dùng theo id
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Cập nhật thông tin
  user.username = username || user.username;
  user.email = email || user.email;

  // Lưu người dùng với thông tin mới
  const updatedUser = await user.save();

  return {
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
  };
};

const banUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Ban user
  user.status = false;

  // Lưu người dùng với thông tin mới
  await user.save();

  return { message: "Ban user successfully" };
};

module.exports = {
  getAllUsers,
  updateUserProfile,
  banUserById,
};
