const fs = require('fs');
const path = require('path');
//these are built-in modules in node

const usersDataPath = path.join(__dirname, '../data/MOCK_DATA.json');

// Read users from the JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersDataPath);
    return JSON.parse(data);
};

const authMiddleware = (req, res, next) => {
    console.log('Incoming Headers:', req.headers);
    const username = req.headers['x-username']; // Simulate token using headers (you can also use JWT in a real app)
    // you do not know how to use JWT though
    
    // Load existing users
    const users = readUsersFromFile();
    
    // Check if user exists
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.username = username; // Store the username in the request object for later use
    next(); // Call the next middleware or route handler
};

module.exports = authMiddleware;