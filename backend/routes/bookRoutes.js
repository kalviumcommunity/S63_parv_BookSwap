const express = require("express");
const router = express.Router();
const { getAllBooks } = require("../controllers/bookController");

router.get("/books", getAllBooks);

module.exports = router;
