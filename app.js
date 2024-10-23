const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require("./routes/genreRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/bookingmovie/auth", authRoutes);
app.use("/api/v1/bookingmovie/user", userRoutes);
app.use("/api/v1/bookingmovie/genre", genreRoutes);

// Tạo ADMIN user khi khởi chạy lần đầu tiên
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: "ADMIN" });
    const hashedPassword = await bcrypt.hash("admin123", 10);
    if (!adminExists) {
      const adminUser = new User({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        fullname: "ADMIN",
        role: "ADMIN",
      });
      await adminUser.save();
      console.log("Admin user created successfully.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

createAdminUser(); // Gọi hàm tạo admin khi khởi động app

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
