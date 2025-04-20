// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  // Set to false to show the logged-out state from the screenshot
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Base classes for main navigation links (Home, Browse)
  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = "font-sans text-base font-medium text-link-text no-underline hover:text-brand-brown py-2 transition-colors duration-200";
    const activeClasses = "font-bold text-brand-brown"; // Style for the active page link
    return isActive ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  // Slightly different styling for the Login link for aesthetics
  const getLoginLinkClass = ({ isActive }) => {
    const baseClasses = "font-sans text-base font-medium text-link-text no-underline hover:text-brand-brown py-2 px-3 transition-colors duration-200"; // Added px-3 for slight spacing
    const activeClasses = "font-bold text-brand-brown";
    return isActive ? `${baseClasses} ${activeClasses}` : baseClasses;
  };


  return (
    // Use theme colors defined in tailwind.config.js
    <nav className="w-full flex justify-between items-center py-4 px-10 bg-navbar-bg border-b-2 border-border-blue"> {/* Ensure bg/border colors match screenshot */}
      {/* Brand Logo */}
      <div className="flex-shrink-0">
        <Link to="/" className="font-serif text-3xl font-bold text-brand-brown no-underline mr-8"> {/* Using custom font/color */}
          BookSwap
        </Link>
      </div>

      {/* Navigation Links (Only Home and Browse when logged out) */}
      <ul className="list-none flex items-center gap-x-10 m-0 p-0 flex-grow justify-start pl-4"> {/* Adjusted gap, added pl-4 for spacing from logo area */}
        <li><NavLink to="/" className={getNavLinkClass} end>Home</NavLink></li>
        <li><NavLink to="/browse" className={getNavLinkClass}>Browse</NavLink></li>
        {/* Conditional rendering for logged-in only links (Wishlist, My Listings) */}
        {/* {isLoggedIn && (
          <>
            <li><NavLink to="/wishlist" className={getNavLinkClass}>Wishlist</NavLink></li>
            <li><NavLink to="/my-listings" className={getNavLinkClass}>My Listings</NavLink></li>
          </>
        )} */}
      </ul>

      {/* Auth Section */}
      <ul className="list-none flex items-center gap-x-6 m-0 p-0 flex-shrink-0"> {/* Adjusted gap */}
        {isLoggedIn ? (
          // Logged In View (Logout Button)
          <li>
            <button
              onClick={() => setIsLoggedIn(false)} // Placeholder action
              className="font-sans text-sm font-semibold text-button-text bg-button-bg hover:bg-button-bg-hover border-none rounded-full py-2.5 px-6 cursor-pointer transition-colors duration-200 whitespace-nowrap" // Using custom colors/font
            >
              Logout
            </button>
          </li>
        ) : (
          // Logged Out View (Login Link, Signup Button)
          <>
            <li>
              {/* Apply slightly enhanced styling for Login link */}
              <NavLink to="/login" className={getLoginLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
               <NavLink to="/signup" className="font-sans text-sm font-semibold text-button-text bg-button-bg hover:bg-button-bg-hover border-none rounded-full py-2.5 px-6 cursor-pointer transition-colors duration-200 whitespace-nowrap inline-block text-center no-underline"> {/* Styled like button */}
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