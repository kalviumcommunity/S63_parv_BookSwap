const express = require("express");
const router = express.Router();
const { getAllBooks, addBook } = require("../controllers/bookController");

// Correct usage:
router.get("/", getAllBooks);
router.post("/", addBook);

module.exports = router;
