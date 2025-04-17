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

// POST /books - Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, imageUrl, price } = req.body;
    const newBook = new Book({ title, author, genre, description, imageUrl, price });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
};

module.exports = { getAllBooks, addBook };
