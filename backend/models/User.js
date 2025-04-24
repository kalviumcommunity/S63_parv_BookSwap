const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  bio: String,
  profilePic: String,
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
