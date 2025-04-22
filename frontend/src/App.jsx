// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddBookPage from './pages/AddBookPage';
import DashboardPage from './pages/DashboardPage';
// Import other pages like WishlistPage, MyListingsPage when created

// TODO: Import AuthProvider/Context if implementing global auth state

function App() {
  return (
    // TODO: Wrap with AuthProvider if needed
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50"> {/* Added default bg */}
        <Navbar />

        {/* Main content area grows to push footer down */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/book/:bookId" element={<BookDetailsPage />} /> {/* Route for book details */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* TODO: Protected Routes (Wrap these in a component that checks auth) */}
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
            {/* <Route path="/my-listings" element={<MyListingsPage />} /> */}

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </main>

        <Footer /> {/* Add Footer */}
      </div>
    </Router>
  );
}

// Basic 404 Component (can be moved to its own file in pages/)
const NotFoundPage = () => (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-brand-brown mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="text-brand-brown hover:underline mt-4 inline-block">Go to Homepage</Link>
    </div>
);


export default App;