const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  // Kiểm tra xem username đã tồn tại chưa
  const existingUsername = await User.findOne({ username: data.username });
  if (existingUsername) {
    throw new Error("Username đã tồn tại");
  }

  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }

  // Mã hóa mật khẩu trước khi lưu
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = new User({
    username: data.username,
    password: hashedPassword,
    email: data.email,
    fullname: data.fullname,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
  });

  await user.save();

  return user;
};

const loginUser = async (data) => {
  // Kiểm tra xem username
  const user = await User.findOne({ username: data.username });
  if (!user) {
    throw new Error("Username không chính xác");
  }

  if (user.status == false) {
    throw new Error("Bạn đã bị chặn!");
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Mật khẩu không chính xác");
  }

  // Nếu thông tin hợp lệ, tạo token JWT
  const token = generateToken(user);

  return { token };
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  registerUser,
  generateToken,
  loginUser,
};
