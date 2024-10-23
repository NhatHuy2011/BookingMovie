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

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

const employee = (req, res, next) => {
  if (req.user && req.user.role === "EMPLOYEE") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Employees only." });
  }
};

module.exports = {
  protect,
  admin,
};
