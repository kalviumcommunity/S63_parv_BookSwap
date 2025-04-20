// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  // Set to false to show the logged-out state from the screenshot
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Style Definitions (Addressing DRY feedback) ---

  // Base classes for main navigation links (Home, Browse)
  const navLinkBaseClasses = "font-sans text-base font-medium text-link-text no-underline hover:text-brand-brown py-2 transition-colors duration-200";
  const navLinkActiveClasses = "font-bold text-brand-brown"; // Style for the active page link

  // Function to determine active style for NavLink
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${navLinkBaseClasses} ${navLinkActiveClasses}` : navLinkBaseClasses;
  };

  // Styling for the Login link (slightly different if needed)
  const getLoginLinkClass = ({ isActive }) => {
    const baseClasses = `${navLinkBaseClasses} px-3`; // Add padding or other specific styles
    return isActive ? `${baseClasses} ${navLinkActiveClasses}` : baseClasses;
  };

  // Shared button styling for Logout and Signup (Addressing DRY)
  const buttonClasses = "font-sans text-sm font-semibold text-button-text bg-button-bg hover:bg-button-bg-hover border-none rounded-full py-2.5 px-6 cursor-pointer transition-colors duration-200 whitespace-nowrap";


  return (
    // --- Addressing ARIA label ---
    <nav
      aria-label="Main navigation" // Added ARIA label for accessibility
      className="w-full flex justify-between items-center py-4 px-10 bg-navbar-bg border-b-2 border-border-blue"
    >
      {/* Brand Logo */}
      <div className="flex-shrink-0">
        <Link to="/" className="font-serif text-3xl font-bold text-brand-brown no-underline mr-8">
          BookSwap
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="list-none flex items-center gap-x-10 m-0 p-0 flex-grow justify-start pl-4">
        <li><NavLink to="/" className={getNavLinkClass} end>Home</NavLink></li>
        <li><NavLink to="/browse" className={getNavLinkClass}>Browse</NavLink></li>
        {/* {isLoggedIn && (...)} */}
      </ul>

      {/* Auth Section */}
      <ul className="list-none flex items-center gap-x-6 m-0 p-0 flex-shrink-0">
        {isLoggedIn ? (
          // Logged In View (Logout Button)
          <li>
            <button
              // --- Addressing Button Type ---
              type="button" // Explicitly set button type
              onClick={() => setIsLoggedIn(false)} // Placeholder action
              // --- Applying shared button styles ---
              className={buttonClasses}
            >
              Logout
            </button>
          </li>
        ) : (
          // Logged Out View (Login Link, Signup Button)
          <>
            <li>
              <NavLink to="/login" className={getLoginLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
               <NavLink
                 to="/signup"
                 // --- Applying shared button styles ---
                 className={`${buttonClasses} inline-block text-center no-underline`} // Added helpers for NavLink as button
               >
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;