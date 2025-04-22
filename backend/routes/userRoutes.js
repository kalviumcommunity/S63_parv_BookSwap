const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require('multer'); // Add multer import for error handling
const upload = require('../controllers/upload'); // <-- Import the upload middleware

// POST /api/users/login - User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords (plain text comparison for now)
    // In production, use bcrypt.compare() or similar
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create user object without password
    const userResponse = user.toObject();
    delete userResponse.password;

    // Return success response with user data
    res.status(200).json({ 
      message: "Login successful", 
      user: userResponse 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login", details: error.message });
  }
});

// GET /api/users - Get all users (no changes)
router.get("/", async (req, res) => {
    // ... (keep existing code)
    try {
      const users = await User.find().select("-password"); // exclude passwords
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
  });

  // GET /api/users/:id - Get user by ID (no changes)
  router.get("/:id", async (req, res) => {
    // ... (keep existing code)
    try {
      const { id } = req.params;

      const user = await User.findById(id).select("-password"); // exclude password
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user", details: error.message });
    }
  });


// POST /api/users/register - Modified for file upload
// Apply the 'upload' middleware here. It expects a single file field named 'profilePicture'.
router.post("/register", upload, async (req, res) => {
  try {
    // Text fields are now in req.body (thanks to multer parsing multipart/form-data)
    const { name, email, password } = req.body;

    // --- Input Validation ---
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    // Add more validation as needed (email format, password strength)

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If file was uploaded but user exists, you might want to delete the uploaded file here
      // Requires 'fs' module: fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Email already registered" }); // Changed 'error' to 'message' for consistency
    }

    // --- Handle File Upload ---
    let profilePicPath = null; // Default to null if no file uploaded
    if (req.file) {
      // If a file was uploaded, req.file contains its info.
      // We store the path relative to the server's static serving path.
      profilePicPath = '/uploads/' + req.file.filename; // Construct the path/URL
      console.log('Uploaded file:', req.file);
      console.log('Saving profile pic path:', profilePicPath);
    } else {
      console.log('No profile picture uploaded.');
    }

    // Create new user instance, including the profilePic path if available
    const newUser = new User({
        name,
        email,
        password, // Remember to HASH the password before saving in production!
        profilePic: profilePicPath // Save the path or null
    });

    // TODO: Hash password before saving
    // e.g., using bcrypt:
    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Exclude password from the response user object
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ message: "User registered successfully", user: userResponse });

  } catch (error) {
     // Handle potential multer errors (like file type)
     if (error instanceof multer.MulterError) {
        return res.status(400).json({ message: `File upload error: ${error.message}` });
     } else if (error.message === 'Error: Images Only!') {
         return res.status(400).json({ message: error.message });
     }
     // Handle other errors (database, etc.)
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to register user", details: error.message }); // Changed 'error' to 'message'
  }
});

module.exports = router;