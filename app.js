const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware'); // Import your logging middleware

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); //used to parse* incoming JSON
//*parse is to translate JSON (which at raw is just a string file)
//to a object
//if you ever forget what a object is, its a structure in C
app.use(loggingMiddleware); // Apply logging middleware globally

// Routes
app.use('/', userRoutes); // Ensure this line is present to actually
//use the routes you made

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*Hi Future self, you're probably gonna use this as reference so check out Mocha once in awhile*/