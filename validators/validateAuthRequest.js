const { check } = require("express-validator");

const validateRegister = () => {
  return [
    check("username", "Tên đăng nhập phải có ít nhất 3 kí tự").isLength({
      min: 3,
    }),
    check("password", "Mật khẩu phải có ít nhất 6 kí tự").isLength({
      min: 6,
    }),
    check("email", "Email không đúng định dạng").isEmail(),
    check("fullname", "Vui lòng nhập tên đầy đủ").not().isEmpty(),
  ];
};

const validateLogin = () => {
  return [
    check("username", "Vui lòng nhập tên đăng nhập").not().isEmpty(),
    check("password", "Vui lòng nhập mật khẩu").not().isEmpty(),
  ];
};

module.exports = { validateRegister, validateLogin };
