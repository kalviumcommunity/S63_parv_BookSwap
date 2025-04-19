const Book = require("../models/Book");

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
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book", details: error.message });
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
  try {
    const { title, author, description } = req.body;
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;

    const updatedBook = await book.save();
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book", details: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
};
