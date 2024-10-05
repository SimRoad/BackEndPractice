// controllers/userController.js
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/MOCK_DATA.json');

// Read users from JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

// Write users to JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register a new user
const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsersFromFile();

    // Check for existing user
    const existingUser = users.find(user => user.email === email || user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);
    writeUsersToFile(users);
    return res.status(201).json({ message: 'User registered successfully' });
};

// Login user
const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Load existing users
    const users = readUsersFromFile();
    
    // Find user by username
    const user = users.find(user => user.username === username);
    
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // On successful login, return the username as a token
    res.status(200).json({
        message: 'Login successful',
        token: user.username // Simulate token by using username
    });
};

// Get user profile
const getProfile = (req, res) => {
    const username = req.username; // Get username from request (set by the auth middleware)

    // Load existing users
    const users = readUsersFromFile();
    
    // Find user by username
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile excluding the password
    const { password, ...userProfile } = user; // Exclude password from the response
    res.status(200).json({ message: 'Profile retrieved successfully', user: userProfile });
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
};