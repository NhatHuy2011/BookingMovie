const Genre = require("../models/Genre");

//Lấy danh sách genre
const getAllGenre = async () => {
  const genres = await Genre.find({});
  return genres;
};

// Thêm genre mới
const createGenre = async (name) => {
  const genre = new Genre({ name });
  await genre.save();
  return genre;
};

// Sửa genre
const updateGenre = async (id, name) => {
  const genre = await Genre.findById(id);
  if (!genre) throw new Error("Genre not found");

  genre.name = name || genre.name;
  await genre.save();
  return genre;
};

// Xoá genre
const deleteGenre = async (id) => {
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) throw new Error("Genre not found");
};

module.exports = {
  getAllGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
