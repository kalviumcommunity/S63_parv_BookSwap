// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display potential login errors
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // To redirect after login

  // Login handler with actual API call
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setLoading(true); // Add loading state

    console.log('Logging in with:', { email, password });

    try {
      const response = await fetch('/api/users/login', { // Backend login endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to login with status ${response.status}`);
      }

      // Handle successful login
      console.log('Login successful:', data);
      alert('Login successful!');
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  // Shared input field styling
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition duration-200";
  // Shared button styling (ensure matches Navbar button if desired)
  const buttonClasses = "w-full font-sans text-base font-semibold text-button-text bg-button-bg hover:bg-button-bg-hover border-none rounded-md py-3 px-6 cursor-pointer transition-colors duration-200";


  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(space.20))] py-12 px-4 sm:px-6 lg:px-8"> {/* Adjust min-height based on navbar height approx */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"> {/* Adjust bg, padding, shadow as needed */}
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold font-serif text-brand-brown">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Display Login Errors */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 pb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClasses}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

           {/* Password Input */}
           <div className="rounded-md shadow-sm -space-y-px pt-4"> {/* Added pt-4 for spacing */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 pb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputClasses}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Optional: Remember Me / Forgot Password (Add if in design) */}
          {/* <div className="flex items-center justify-between pt-2">
             <div className="text-sm">
              <a href="#" className="font-medium text-brand-brown hover:text-link-text">
                Forgot your password?
              </a>
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="pt-4"> {/* Added pt-4 for spacing */}
            <button
              type="submit"
              className={buttonClasses}
            >
              Login
            </button>
          </div>
        </form>

        {/* Link to Signup */}
        <div className="text-sm text-center pt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="font-medium text-brand-brown hover:text-link-text hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;