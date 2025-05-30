const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path'); // <-- Import path module

dotenv.config(); // Load env variables from .env file

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes"); // Corrected variable name
const requestRoutes = require("./routes/requestRoutes"); // Add request routes

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'http://localhost:3000', // Local development
  'https://book-swap-lac.vercel.app', // No trailing slash
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Still needed for other JSON routes
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// --- Serve Static Files from 'uploads' directory ---
// This makes files inside './uploads/' accessible via '/uploads/filename.ext' URL path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --- End Static File Serving ---

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes); // Use the correct variable name
app.use("/api/requests", requestRoutes); // Add request routes

// Default route (optional)
app.get('/', (req, res) => {
    res.send('BookSwap API is running!');
});

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));