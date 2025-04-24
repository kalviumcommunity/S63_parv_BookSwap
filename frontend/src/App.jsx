// src/App.jsx
import React from 'react';
// Removed BrowserRouter import, moved to main.jsx
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './pages/ProtectedRoute'; // <-- Import ProtectedRoute

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddBookPage from './pages/AddBookPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';
import { Link } from 'react-router-dom'; // For NotFoundPage

function App() {
  return (
    // AuthProvider is now wrapping in main.jsx
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/book/:bookId" element={<BookDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/add-book"
              element={
                <ProtectedRoute> {/* <-- Wrap with ProtectedRoute */}
                  <AddBookPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/dashboard"
              element={
                <ProtectedRoute> {/* <-- Wrap with ProtectedRoute */}
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

// Basic 404 Component
const NotFoundPage = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
    <p className="text-xl text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <Link to="/" className="px-6 py-3 bg-brand-brown text-white rounded-md hover:bg-opacity-90 transition-colors">
      Return to Home
    </Link>
  </div>
);

export default App;