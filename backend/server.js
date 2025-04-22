const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path'); // <-- Import path module

dotenv.config(); // Load env variables from .env file

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes"); // Corrected variable name

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json()); // Still needed for other JSON routes
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// --- Serve Static Files from 'uploads' directory ---
// This makes files inside './uploads/' accessible via '/uploads/filename.ext' URL path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --- End Static File Serving ---

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes); // Use the correct variable name

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