const User = require("../models/User");

// Hàm lấy danh sách người dùng trong service
const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const updateUserProfile = async (data) => {
  // Tìm người dùng theo id
  const user = await User.findById(data.id);

  if (!user) {
    throw new Error("User not found");
  }

  // Cập nhật thông tin
  user.fullname = data.fullname || user.fullname;
  user.dateOfBirth = data.dateOfBirth || user.dateOfBirth;
  user.gender = data.gender || user.gender;

  // Lưu người dùng với thông tin mới
  await user.save();

  return user;
};

const banUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Ban user
  user.status = false;

  await user.save();

  return { message: "Ban user successfully" };
};

module.exports = {
  getAllUsers,
  updateUserProfile,
  banUserById,
};
