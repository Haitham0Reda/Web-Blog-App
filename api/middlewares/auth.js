// Import the 'jsonwebtoken' module for working with JSON Web Tokens
const jwt = require('jsonwebtoken');

// Middleware function to verify and authenticate JSON Web Tokens (JWT)
module.exports = (req, res, next) => {
    try {
        // Get the full token from the Authorization header in the request
        const fullToken = req.headers.authorization;

        // Extract the actual token from the fullToken using split, if it exists
        const token = fullToken?.split(' ')[1];

        // If the token is not present, return a 403 Forbidden status with 'Access Denied' message
        if (!token) return res.status(403).send('Access Denied');

        // Verify the token using the "securityKey" as the secret, and obtain the decoded user data
        let user = jwt.verify(token, "securityKey");

        // Attach the decoded user data to the request object for future use in other middleware or route handlers
        req.user = user;

        // Call the next middleware or route handler in the chain
        next();
    } catch (err) {
        // If there's an error during token verification or decoding, return a 400 Bad Request status with 'Invalid JWT' message
        return res.status(400).send('Invalid JWT');
    }
};
