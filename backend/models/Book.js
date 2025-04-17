const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  available: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
