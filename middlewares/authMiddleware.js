const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Kiểm tra nếu có token trong header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ header
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token để lấy thông tin người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lưu thông tin user vào request để có thể dùng trong các route tiếp theo
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Cho phép tiếp tục xử lý yêu cầu
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
