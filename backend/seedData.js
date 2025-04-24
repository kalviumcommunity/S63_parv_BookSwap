// seedData.js - Script to populate the database with sample data
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('./models/User');
const Book = require('./models/Book');
const Request = require('./models/Request');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected for seeding'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    bio: 'I love reading science fiction and fantasy books.',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    bio: 'Avid reader and collector of classic literature.',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    bio: 'I enjoy mystery novels and historical fiction.',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    await Request.deleteMany({});
    
    console.log('🧹 Cleared existing data');

    // Create users with hashed passwords
    const createdUsers = [];
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({
        ...user,
        password: hashedPassword
      });
      createdUsers.push(newUser);
      console.log(`👤 Created user: ${newUser.name}`);
    }

    // Create books for each user
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
        price: 12.99,
        available: true,
        description: 'A classic novel about the American Dream.',
        condition: 'Good',
        user: createdUsers[0]._id
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Classic',
        price: 10.50,
        available: true,
        description: 'A powerful story about racial injustice.',
        condition: 'Very Good',
        user: createdUsers[0]._id
      },
      {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        price: 8.75,
        available: true,
        description: 'A dystopian novel about totalitarianism.',
        condition: 'Acceptable',
        user: createdUsers[1]._id
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        price: 11.00,
        available: true,
        description: 'A classic romance novel.',
        condition: 'Like New',
        user: createdUsers[1]._id
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        genre: 'Coming-of-age',
        price: 9.25,
        available: true,
        description: 'A coming-of-age novel about teenage angst.',
        condition: 'Good',
        user: createdUsers[2]._id
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        price: 14.00,
        available: true,
        description: 'A fantasy novel about a hobbit on an adventure.',
        condition: 'Very Good',
        user: createdUsers[2]._id
      }
    ];

    const createdBooks = [];
    for (const book of books) {
      const newBook = await Book.create(book);
      createdBooks.push(newBook);
      console.log(`📚 Created book: ${newBook.title}`);
    }

    // Create some requests
    const requests = [
      {
        book: createdBooks[0]._id,
        seller: createdUsers[0]._id,
        requester: createdUsers[1]._id,
        message: 'I would love to read this book. Is it still available?',
        status: 'pending'
      },
      {
        book: createdBooks[2]._id,
        seller: createdUsers[1]._id,
        requester: createdUsers[0]._id,
        message: 'I\'ve been looking for this book for a while. Can we arrange a swap?',
        status: 'accepted'
      },
      {
        book: createdBooks[4]._id,
        seller: createdUsers[2]._id,
        requester: createdUsers[0]._id,
        message: 'I\'m interested in this book. Is the price negotiable?',
        status: 'pending'
      }
    ];

    for (const request of requests) {
      const newRequest = await Request.create(request);
      console.log(`📝 Created request for book: ${
        createdBooks.find(b => b._id.toString() === newRequest.book.toString()).title
      }`);
    }

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();