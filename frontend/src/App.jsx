// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component

// import HomePage from './pages/HomePage';
// import BrowsePage from './pages/BrowsePage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// ... etc

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Ensure app takes full height */}
        <Navbar /> {/* Navbar renders on all pages */}

        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-8"> {/* Example: Content styling */}
          <Routes>
            {/* Define routes for your pages */}
            <Route path="/" element={<div>Home Page Content</div>} /> {/* Placeholder */}
            <Route path="/browse" element={<div>Browse Page Content</div>} /> {/* Placeholder */}
            <Route path="/wishlist" element={<div>Wishlist Page Content</div>} /> {/* Placeholder */}
            <Route path="/my-listings" element={<div>My Listings Page Content</div>} /> {/* Placeholder */}
            <Route path="/login" element={<div>Login Page Content</div>} /> {/* Placeholder */}
            <Route path="/signup" element={<div>Signup Page Content</div>} /> {/* Placeholder */}
            {/* Add routes for AddBookPage, BookDetailsPage, DashboardPage etc. */}
          </Routes>
        </main>

        {/* Optional Footer Component */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;