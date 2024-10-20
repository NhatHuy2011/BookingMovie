const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (username, email, password) => {
  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  // Mã hóa mật khẩu trước khi lưu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user mới với mật khẩu đã mã hóa và role mặc định là 'USER'
  const user = new User({ username, email, password: hashedPassword });

  // Lưu user vào database
  await user.save();

  // Trả về user đã tạo
  return user;
};

const loginUser = async (email, password) => {
  // Kiểm tra xem email có tồn tại không
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (user.status == false) {
    throw new Error("User has been ban!");
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password.");
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
