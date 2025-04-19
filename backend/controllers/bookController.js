const Book = require("../models/Book");
const mongoose = require("mongoose");

// GET /books - Fetch all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// GET /books/:id - Fetch book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book", details: err.message });
  }
};


// POST /books - Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, imageUrl, price } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and Author are required" });
    }

    const newBook = new Book({ title, author, genre, description, imageUrl, price });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
};

// PUT /books/:id - Update an existing book
const updateBook = async (req, res) => {
  const { id } = req.params;

  // Handle invalid ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  const updateFields = {};
  const allowedFields = ["title", "author", "description", "genre", "price"];

  // Collect only valid fields
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  // If no valid fields provided
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: "No valid fields provided for update." });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    res.status(500).json({ error: "Failed to update book", details: err.message });
  }
};


module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
};
