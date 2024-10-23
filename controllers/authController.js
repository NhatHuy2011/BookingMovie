const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    await authService.registerUser(req.body);

    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token } = await authService.loginUser(req.body);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
