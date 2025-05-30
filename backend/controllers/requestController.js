// controllers/requestController.js
const Request = require('../models/Request');
const Book = require('../models/Book');

// Create a new request
const createRequest = async (req, res) => {
  try {
    const { bookId, message, contactDetails } = req.body;
    const requesterId = req.user.id; // From auth middleware

    // Validate required fields
    if (!bookId || !message) {
      return res.status(400).json({ message: 'Book ID and message are required' });
    }

    // Find the book to get the seller ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Prevent requesting your own book
    if (book.user.toString() === requesterId) {
      return res.status(400).json({ message: 'You cannot request your own book' });
    }

    // Check if a request already exists for this book and requester
    const existingRequest = await Request.findOne({
      book: bookId,
      requester: requesterId,
      status: { $in: ['pending', 'accepted'] } // Only check active requests
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have an active request for this book' });
    }

    // Create the request
    const newRequest = new Request({
      book: bookId,
      seller: book.user, // The user who owns the book
      requester: requesterId,
      message,
      contactDetails: contactDetails || '',
      status: 'pending'
    });

    await newRequest.save();

    // Return the created request with populated fields
    const populatedRequest = await Request.findById(newRequest._id)
      .populate('book', 'title author price condition')
      .populate('seller', 'name email')
      .populate('requester', 'name email');

    res.status(201).json({
      message: 'Request created successfully',
      request: populatedRequest
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ message: 'Failed to create request', details: error.message });
  }
};

// Get incoming requests (requests for the user's books)
const getIncomingRequests = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    const requests = await Request.find({ seller: userId })
      .populate('book', 'title author price condition')
      .populate('requester', 'name email profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Get incoming requests error:', error);
    res.status(500).json({ message: 'Failed to fetch incoming requests', details: error.message });
  }
};

// Get outgoing requests (requests made by the user)
const getOutgoingRequests = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    const requests = await Request.find({ requester: userId })
      .populate('book', 'title author price condition')
      .populate('seller', 'name email profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Get outgoing requests error:', error);
    res.status(500).json({ message: 'Failed to fetch outgoing requests', details: error.message });
  }
};



module.exports = {
  createRequest,
  getIncomingRequests,
  getOutgoingRequests,
  updateRequestStatus
};