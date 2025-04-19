const Book = require("../models/Book");
const User = require("../models/User");

// GET /books - Fetch all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('user', 'name email');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// GET /books/:id - Fetch book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate('user', 'name email');

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
    const { title, author, genre, description, price, available, user: userId, imageUrl } = req.body;

    if (!title || !author || !userId) {
      return res.status(400).json({ error: "Title, Author, and User ID are required" });
    }

    // Validate if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      description,
      price,
      available,
      user: userId,
      imageUrl,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
};

// PUT /books/:id - Update an existing book
const updateBook = async (req, res) => {
  try {
    const { title, author, description, genre, price, available } = req.body;
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (genre) book.genre = genre;
    if (price !== undefined) book.price = price;
    if (available !== undefined) book.available = available;

    const updatedBook = await book.save();
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book", details: error.message });
  }
};

// DELETE /books/:id - Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book", details: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
