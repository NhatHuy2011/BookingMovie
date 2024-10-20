// Middleware kiểm tra role của user
const admin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next(); // Nếu user có role là ADMIN, cho phép tiếp tục
  } else {
    res.status(403).json({ message: "Access denied. Admins only." }); // Nếu không phải ADMIN, từ chối truy cập
  }
};

module.exports = { admin };
