const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/validateAuthRequest");
const { validationResult } = require("express-validator");

// Route đăng ký
router.post("/register", validateRegister(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  authController.register(req, res);
});

//Route đăng nhập
router.post("/login", validateLogin(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  authController.login(req, res);
});

module.exports = router;
