const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware'); // Import your logging middleware

const app = express();
const PORT = 3000;

// Middleware--------------------------------------------------

//app.use makes it so that it can be used globally

// Array to track incoming requests for rate limiting
let requestArray = [];

// Middleware to limit the number of requests per client
const rateLimitMiddleware = (req, res, next) => {
    // Log each request with the requestor's host and time of request
    requestArray.push({
        requestor: req.headers['host'], 
        requestTime: new Date()
    });

    // Filter out requests made by the same client (using the host header)
    const filteredByHostArray = requestArray.filter(request => request.requestor === req.headers['host']);
    //ismis should have this >_> <v<
    
    // Get the first and the last requests within the array to compare time intervals
    const firstRequest = new Date(filteredByHostArray[0].requestTime);
    const lastRequest = new Date(filteredByHostArray[filteredByHostArray.length - 1].requestTime);

    // Check if the client has made more than 5 requests in the last 30 seconds
    if (filteredByHostArray.length >= 5 && (lastRequest - firstRequest) < 30000) {
        return res.status(429).send('Too many requests'); 
        // Respond with "Too Many Requests" status code
    }

    next(); // If under the rate limit, allow the request to proceed
};

app.use(rateLimitMiddleware);

app.use(bodyParser.json()); //used to parse* incoming JSON
//*parse is to translate JSON (which at raw is just a string file)
//to a object
//if you ever forget what a object is, its a structure in C
app.use(loggingMiddleware); // Apply logging middleware globally

// Routes---------------------------------------------------------
app.use('/', userRoutes); // Ensure this line is present to actually
//use the routes you made

//which port is it on
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*Hi Future self, you're probably gonna use this as reference so check out Mocha once in awhile*/