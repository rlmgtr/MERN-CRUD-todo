const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Token not found");
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET);
        
        // Attach userId to the request object
        req.user = { _id: decoded.userId }; // Ensure the key used in decoded is 'userId'
        
        next(); // Continue to the next middleware/route handler
    } catch (error) {
        return res.status(400).send('Invalid or expired token');
    }
};

module.exports = isLoggedIn;
