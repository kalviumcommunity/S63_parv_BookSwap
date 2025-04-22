// src/pages/AddBookPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState(''); // Consider dropdown: 'Like New', 'Very Good', 'Good', 'Acceptable'
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // For file object
  const [imagePreview, setImagePreview] = useState(null); // For showing preview
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Shared input/button styles
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition duration-200";
  const buttonClasses = "w-full font-sans text-base font-semibold text-button-text bg-button-bg hover:bg-button-bg-hover border-none rounded-md py-3 px-6 cursor-pointer transition-colors duration-200 disabled:opacity-50";
  const labelClasses = "block text-sm font-medium text-gray-700 pb-1";


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
        setImage(null);
        setImagePreview(null);
    }
  };

  // TODO: Implement API call to add book
  const handleAddBook = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!title || !author || !condition || !price) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
    }

    // Use FormData to send image file along with other data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('price', price);
    if (image) {
      formData.append('bookImage', image); // Key must match backend multer field name
    }
    // TODO: Append seller ID from auth context

    console.log('Submitting book data...'); // Log FormData entries if needed

    // --- Replace with actual API call ---
    // try {
    //   const response = await fetch('/api/books', { // Your backend endpoint to add books
    //     method: 'POST',
    //     // Don't set Content-Type header when using FormData, browser does it
    //     body: formData,
    //     // Include authentication token if needed
    //   });
    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || 'Failed to add book');
    //   }

    //   console.log('Book added successfully:', data);
    //   navigate(`/book/${data._id}`); // Redirect to the new book's details page

    // } catch (err) {
    //   console.error('Add book error:', err);
    //   setError(err.message || 'An error occurred while adding the book.');
    // } finally {
    //   setLoading(false);
    // }
    // --- End of TODO ---

     // --- Temporary Success Simulation ---
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
     console.log('Simulated Book add successful');
     setLoading(false);
     navigate(`/browse`); // Redirect to browse page after simulated success
     // --- End Temporary Simulation ---
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold font-serif text-brand-brown mb-8 text-center">Add a New Book</h1>

      <form className="space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleAddBook}>
        {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClasses}>Title <span className="text-red-500">*</span></label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClasses} />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className={labelClasses}>Author <span className="text-red-500">*</span></label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required className={inputClasses} />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClasses}>Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className={inputClasses}></textarea>
        </div>

        {/* Condition */}
        <div>
           <label htmlFor="condition" className={labelClasses}>Condition <span className="text-red-500">*</span></label>
           <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} required className={`${inputClasses} bg-white`}>
             <option value="" disabled>Select condition</option>
             <option value="Like New">Like New</option>
             <option value="Very Good">Very Good</option>
             <option value="Good">Good</option>
             <option value="Acceptable">Acceptable</option>
           </select>
        </div>

        {/* Price */}
         <div>
          <label htmlFor="price" className={labelClasses}>Price ($) <span className="text-red-500">*</span></label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className={inputClasses} placeholder="e.g., 10.50" />
        </div>

        {/* Image Upload */}
        <div>
            <label htmlFor="image" className={labelClasses}>Book Cover Image</label>
            <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/webp" // Specify acceptable file types
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navbar-bg file:text-brand-brown hover:file:bg-gray-200 cursor-pointer"
            />
             {imagePreview && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 pb-1">Image Preview:</p>
                    <img src={imagePreview} alt="Book cover preview" className="max-h-40 rounded border border-gray-300" />
                </div>
            )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
             <button type="submit" className={buttonClasses} disabled={loading}>
               {loading ? 'Adding Book...' : 'Add Book to Listings'}
             </button>
        </div>

      </form>
    </div>
  );
};

export default AddBookPage;