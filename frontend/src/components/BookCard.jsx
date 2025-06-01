// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { smallBookPlaceholder } from '../assets/placeholders';

const BookCard = ({ book }) => {
  // Basic validation for book prop
  if (!book) {
    return null; // Or return a placeholder/error card
  }

  // Default values in case properties are missing
  const imageUrl = book.imageUrl || smallBookPlaceholder;
  const title = book.title || 'Untitled Book';
  const author = book.author || 'Unknown Author';
  const price = book.price !== undefined ? `$${book.price.toFixed(2)}` : 'Price not set';
  const condition = book.condition || 'Condition unspecified';
  const id = book._id || book.id || '#'; // Use _id from MongoDB or fallback

  return (
    <Link to={`/book/${id}`} className="block group"> {/* Link the whole card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-shadow duration-300 hover:shadow-xl">
        {/* Book Info Only - Image removed */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold font-sans text-gray-800 mb-1 truncate group-hover:text-brand-brown transition-colors duration-300" title={title}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 truncate" title={author}>{author}</p>
          <p className="text-xs text-gray-500 mb-3">{condition}</p>
          <p className="text-lg font-bold text-brand-brown">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;