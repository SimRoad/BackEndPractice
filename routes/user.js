// routes/user.js
const express = require('express');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware'); // Import your auth middleware forgot :P
const router = express.Router();

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Get user profile route
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;