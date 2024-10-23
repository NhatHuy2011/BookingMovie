const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  premiere: {
    type: Date,
    required: true,
    unique: true,
  },
  languege: {
    type: String,
  },
  duration: {
    type: Number,
  },
  content: {
    type: String,
  },
  rate: {
    type: Number,
  },
  image: {
    type: String,
  },
  director: {
    type: String,
  },
  actors: [
    {
      type: String,
      required: true,
    },
  ],
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
