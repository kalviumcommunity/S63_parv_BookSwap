const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/:id", getBookById);  // <-- NEW
router.post("/", addBook);
router.put("/:id", updateBook);

module.exports = router;