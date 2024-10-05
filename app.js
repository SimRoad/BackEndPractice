const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const authMiddleware = require('./middleware/authMiddleware'); // Import your auth middleware
const loggingMiddleware = require('./middleware/loggingMiddleware'); // Import your logging middleware

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(loggingMiddleware); // Apply logging middleware globally

// Routes
app.use('/', userRoutes); // Ensure this line is present

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/home', (req, res) => {
    res.send('Hello World!');
});