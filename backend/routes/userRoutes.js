const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/users - Get all users
router.get("/", async (req, res) => {
    try {
      const users = await User.find().select("-password"); // exclude passwords
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
  });
  
  // GET /api/users/:id - Get user by ID
  router.get("/:id", async (req, res) => {
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

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user", details: error.message });
  }
});

module.exports = router;
