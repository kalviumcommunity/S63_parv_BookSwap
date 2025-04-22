// src/pages/BookDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const BookDetailsPage = () => {
  const { bookId } = useParams(); // Get bookId from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(placeholderBookDetail);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Get current user ID from auth context to prevent requesting own book
  const currentUserId = 'currentUserPlaceholderId';

  // TODO: Implement API call to fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- Replace with actual API call ---
        // const response = await fetch(`/api/books/${bookId}`);
        // if (!response.ok) throw new Error('Book not found or failed to load');
        // const data = await response.json();
        // setBook(data);

        // --- Using Placeholder Data ---
        console.log("Fetching details for book ID:", bookId);
        await new Promise(resolve => setTimeout(resolve, 700)); // Simulate delay
         // Find book in placeholder list (replace with real fetch)
        const foundBook = placeholderBooks.find(b => (b._id || b.id) === bookId) || null;
        if (foundBook) {
            // Simulate adding more details
            setBook({
                ...foundBook,
                description: `This is a detailed description for ${foundBook.title}. It talks about the plot, characters, and themes explored within the pages. A must-read for fans of ${foundBook.author}.`,
                isbn: '978-1234567890', // Example extra detail
                seller: { name: 'Test Seller', _id: 'seller123'} // Example seller detail
            });
        } else {
             throw new Error('Book not found (placeholder)');
        }
        // --- End Placeholder ---

      } catch (err) {
        setError(err.message);
        setBook(null); // Clear book data on error
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Placeholder for sending swap request
  const handleSendRequest = async () => {
    // TODO: Check if user is logged in
    // if (!isUserLoggedIn) { navigate('/login'); return; }

    console.log(`Sending swap request for book ${bookId}...`);
    // TODO: Implement API call to backend to create a swap request
    // try {
    //    await fetch('/api/requests', { method: 'POST', body: JSON.stringify({ bookId: book._id, requesterId: currentUserId }), ...});
    //    alert('Swap request sent successfully!');
    //    // Maybe disable button or show feedback
    // } catch (err) {
    //    alert('Failed to send swap request.');
    // }
      alert('(Simulated) Swap request sent!');
  };


  if (loading) return <p className="text-center py-10">Loading book details...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (!book) return <p className="text-center py-10">Book not found.</p>;

  const imageUrl = book.imageUrl || placeholderImage;

  // Prevent requesting own book (basic check)
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

           {/* Action Button */}
           {!isOwnBook ? (
                <button
                    onClick={handleSendRequest}
                    className={buttonClasses}
                    // TODO: Disable if request already sent or user not logged in
                >
                    Send Swap Request
                </button>
           ) : (
                <p className="text-sm text-gray-500 italic">This is your own listing.</p>
           )}

        </div>
      </div>
    </div>
  );
};
// Need placeholderBooks for placeholder logic in useEffect
const placeholderBooks = [ { _id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, condition: 'Good', imageUrl: '...' }, { _id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.50, condition: 'Very Good', imageUrl: '...' }, /* ...more... */ ];

export default BookDetailsPage;