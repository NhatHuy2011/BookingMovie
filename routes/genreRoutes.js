const express = require("express");
const {
  getAllGenreController,
  createGenreController,
  updateGenreController,
  deleteGenreController,
} = require("../controllers/genreController");

const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route để xem danh sách phim
router.get("/all", getAllGenreController);

// Thêm genre mới (chỉ dành cho admin)
router.post("/add", protect, admin, createGenreController);

// Sửa genre (chỉ dành cho admin)
router.put("/:id", protect, admin, updateGenreController);

// Xoá genre (chỉ dành cho admin)
router.delete("/:id", protect, admin, deleteGenreController);

module.exports = router;
