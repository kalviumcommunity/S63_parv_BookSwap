const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/:id", getBookById);  
router.post("/add", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook); 
router.post('/add', addBook);

module.exports = router;