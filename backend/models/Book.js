const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    genre: String,
    price: Number,
    available: Boolean,

    // New fields for description and imageUrl
    description: { type: String, required: false }, // Description of the book
    imageUrl: { type: String, required: false }, // URL for the book's image
    
    // Relationship: Which user created this listing
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
