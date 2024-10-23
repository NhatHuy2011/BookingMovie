const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  avatar: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  point: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
