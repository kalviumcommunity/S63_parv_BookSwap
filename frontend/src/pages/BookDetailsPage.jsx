// src/pages/BookDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

// Placeholder image
const placeholderImage = "https://via.placeholder.com/300/d3d3d3/000000?text=No+Image";
// Placeholder data structure
const placeholderBookDetail = {
  title: 'Loading Book...',
  author: 'Loading...',
  description: 'Loading description...',
  price: 0.00,
  condition: 'Loading...',
  imageUrl: placeholderImage,
  seller: { name: 'Loading Seller...', _id: 'loading' }, // Assuming seller info is populated
};

// Shared button styling
const buttonClasses = "inline-block font-sans text-base font-semibold text-button-text bg-button-bg hover:bg-button-bg-hover border-none rounded-md py-3 px-8 cursor-pointer transition-colors duration-200 no-underline";
const secondaryButtonClasses = "inline-block font-sans text-base font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 border-none rounded-md py-3 px-8 cursor-pointer transition-colors duration-200 no-underline ml-4";

const BookDetailsPage = () => {
  const { bookId } = useParams(); // Get bookId from URL
  const navigate = useNavigate();
  const { token, user, isAuthenticated } = useAuth(); // Get auth context
  const [book, setBook] = useState(placeholderBookDetail);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const currentUserId = user?._id || '';

  // Check if book is in user's wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (!isAuthenticated || !token) return;
      
      try {
        const response = await fetch('/api/users/me/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const wishlist = await response.json();
          setInWishlist(wishlist.some(item => item._id === bookId));
        }
      } catch (err) {
        console.error('Error checking wishlist:', err);
      }
    };

    checkWishlist();
  }, [bookId, token, isAuthenticated]);
  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch book details from API
        const response = await fetch(`/api/books/${bookId}`);
        
        if (!response.ok) {
          throw new Error(response.status === 404 
            ? 'Book not found' 
            : 'Failed to load book details');
        }
        
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError(err.message);
        setBook(null); // Clear book data on error
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Handle adding/removing from wishlist
  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/book/${bookId}` } });
      return;
    }

    setWishlistLoading(true);
    try {
      const url = `/api/users/me/wishlist/${bookId}`;
      const method = inWishlist ? 'DELETE' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setInWishlist(!inWishlist);
      } else {
        throw new Error('Failed to update wishlist');
      }
    } catch (err) {
      console.error('Wishlist update error:', err);
      alert('Failed to update wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };
  const handleSendRequest = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/book/${bookId}` } });
      return;
    }

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: book._id,
          message: 'I am interested in this book. Please contact me to arrange the swap.',
          contactDetails: 'You can reach me via email.'
        })
      });

      // Parse the response body
      const data = await response.json();
      
      if (!response.ok) {
        // Use the specific error message from the backend if available
        throw new Error(data.message || 'Failed to send request');
      }

      alert('Request sent successfully!');
      
      // Optionally redirect to dashboard or disable button
    } catch (err) {
      console.error('Send request error:', err);
      alert(err.message);
    }
  };


  if (loading) return <p className="text-center py-10">Loading book details...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (!book) return <p className="text-center py-10">Book not found.</p>;

  const imageUrl = book.imageUrl || placeholderImage;

  // Prevent requesting own book
  const isOwnBook = book.seller && book.seller._id === currentUserId;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="md:flex md:gap-x-10">
        {/* Left Side: Image */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <img
             src={imageUrl}
             alt={`Cover of ${book.title}`}
             className="w-full h-auto object-contain rounded-md shadow-md max-h-[500px]"
             onError={(e) => { e.target.onerror = null; e.target.src=placeholderImage }}
           />
        </div>

        {/* Right Side: Details */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold font-serif text-brand-brown mb-2">{book.title}</h1>
          <p className="text-xl text-gray-700 font-sans mb-4">by {book.author}</p>
          <p className="text-2xl font-bold text-brand-brown mb-4">${book.price?.toFixed(2)}</p>

          <div className="mb-6 border-t border-b border-gray-200 py-4">
             <h3 className="text-lg font-semibold mb-2 text-gray-800">Details</h3>
             <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Condition:</span> {book.condition}</p>
             {book.isbn && <p className="text-sm text-gray-600 mb-1"><span className="font-medium">ISBN:</span> {book.isbn}</p>}
             {book.seller && <p className="text-sm text-gray-600"><span className="font-medium">Seller:</span> {book.seller.name}</p>}
          </div>

          <div className="mb-8">
             <h3 className="text-lg font-semibold mb-2 text-gray-800">Description</h3>
             <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{book.description}</p>
          </div>

           {/* Action Buttons */}
           <div className="flex flex-wrap gap-y-4">
             {!isOwnBook ? (
                  <button
                      onClick={handleSendRequest}
                      className={buttonClasses}
                      disabled={!isAuthenticated}
                  >
                      {isAuthenticated ? 'Send Swap Request' : 'Login to Request'}
                  </button>
             ) : (
                  <p className="text-sm text-gray-500 italic">This is your own listing.</p>
             )}
             
             {!isOwnBook && (
                <button
                  onClick={handleWishlistToggle}
                  className={secondaryButtonClasses}
                  disabled={wishlistLoading}
                >
                  {wishlistLoading 
                    ? 'Updating...' 
                    : inWishlist 
                      ? 'Remove from Wishlist' 
                      : 'Add to Wishlist'}
                </button>
             )}
           </div>

        </div>
      </div>
    </div>
  );
};
// Need placeholderBooks for placeholder logic in useEffect
const placeholderBooks = [ { _id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, condition: 'Good', imageUrl: '...' }, { _id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.50, condition: 'Very Good', imageUrl: '...' }, /* ...more... */ ];

export default BookDetailsPage;