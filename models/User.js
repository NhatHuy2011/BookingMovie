const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"], // Chỉ cho phép USER và ADMIN
    default: "USER",
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
