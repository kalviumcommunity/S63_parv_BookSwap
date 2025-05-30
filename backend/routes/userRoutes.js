const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require('multer'); // Add multer import for error handling
const { uploadProfilePicture } = require('../controllers/upload'); // <-- Import the uploadProfilePicture middleware
const bcrypt = require('bcrypt'); // <-- Import bcrypt
const jwt = require('jsonwebtoken'); // <-- Import jsonwebtoken
const authMiddleware = require('../controllers/auth');

// GET /api/users - Get all users (no changes)
router.get("/", async (req, res) => {
    // ... (keep existing code)
    try {
      const users = await User.find().select("-password"); // exclude passwords
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
  });

  // GET /api/users/:id - Get user by ID (no changes)
  router.get("/:id", async (req, res) => {
    // ... (keep existing code)
    try {
      const { id } = req.params;

      const user = await User.findById(id).select("-password"); // exclude password
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user", details: error.message });
    }
  });
// ... (other GET routes remain the same) ...



// GET /api/users/me/listings - Get listings for current user
router.get("/me/listings", authMiddleware, async (req, res) => {
  try {
      const books = await require('../models/Book').find({ user: req.user.id }); // Find books by user ID from token
      res.json(books);
  } catch (error) {
       console.error(error.message);
       res.status(500).send("Server Error");
  }
});

// GET /api/users/me/wishlist - Get wishlist for current user
router.get("/me/wishlist", authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).populate('wishlist');
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user.wishlist);
  } catch (error) {
       console.error(error.message);
       res.status(500).send("Server Error");
  }
});

// POST /api/users/me/wishlist/:bookId - Add book to wishlist
router.post("/me/wishlist/:bookId", authMiddleware, async (req, res) => {
  try {
      const { bookId } = req.params;
      const userId = req.user.id;

      // Check if book exists
      const book = await require('../models/Book').findById(bookId);
      if (!book) {
          return res.status(404).json({ message: "Book not found" });
      }

      // Add book to wishlist if not already there
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Check if book is already in wishlist
      if (user.wishlist.includes(bookId)) {
          return res.status(400).json({ message: "Book already in wishlist" });
      }

      // Add book to wishlist
      user.wishlist.push(bookId);
      await user.save();

      res.status(200).json({ message: "Book added to wishlist", wishlist: user.wishlist });
  } catch (error) {
       console.error(error.message);
       res.status(500).send("Server Error");
  }
});

// DELETE /api/users/me/wishlist/:bookId - Remove book from wishlist
router.delete("/me/wishlist/:bookId", authMiddleware, async (req, res) => {
  try {
      const { bookId } = req.params;
      const userId = req.user.id;

      // Remove book from wishlist
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Check if book is in wishlist
      if (!user.wishlist.includes(bookId)) {
          return res.status(400).json({ message: "Book not in wishlist" });
      }

      // Remove book from wishlist
      user.wishlist = user.wishlist.filter(id => id.toString() !== bookId);
      await user.save();

      res.status(200).json({ message: "Book removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
       console.error(error.message);
       res.status(500).send("Server Error");
  }
});



module.exports = router;