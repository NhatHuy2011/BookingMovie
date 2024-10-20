const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await authService.registerUser(username, email, password);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
