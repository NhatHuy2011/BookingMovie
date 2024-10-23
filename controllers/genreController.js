const {
  getAllGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../services/genreService");

//Xem danh sach Genre
const getAllGenreController = async (req, res) => {
  try {
    const genres = await getAllGenre();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Them Genre
const createGenreController = async (req, res) => {
  try {
    const genre = await createGenre(req.body.name);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sua Genre
const updateGenreController = async (req, res) => {
  try {
    const genre = await updateGenre(req.params.id, req.body.name);
    res.status(200).json(genre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xoa Genre
const deleteGenreController = async (req, res) => {
  try {
    await deleteGenre(req.params.id);
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllGenreController,
  createGenreController,
  updateGenreController,
  deleteGenreController,
};
