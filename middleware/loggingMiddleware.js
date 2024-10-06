const loggingMiddleware = (req, res, next) => {
    const method = req.method; // Get the HTTP method (GET, POST, etc.)
    const route = req.originalUrl; // Get the requested route
    const timestamp = new Date().toISOString(); // Get the current timestamp

    // Log the request details
    console.log(`[${timestamp}] ${method} request to ${route}`);

    next(); // Call the next middleware or route handler
};

module.exports = loggingMiddleware;

/*
OPTIONS request probably exist of the 
CORS Checks: It helps in determining if a cross-origin request (a 
request made from a different domain) is permitted by the server, 
ensuring that web applications can securely interact with resources 
from other origins.
cause I requested from my browser
*/

