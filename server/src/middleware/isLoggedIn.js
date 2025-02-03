const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.header('Authorization')?.replace("Bearer ", "");

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        // Verify the token using the secret key and decode it
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("Decoded Token:", decoded);  // Debug log to check the decoded token structure

        // Attach user ID to the request object if decoded token has userId
        if (!decoded.userId) {
            return res.status(400).json({ message: "Invalid token structure, userId missing" });
        }

        req.user = { _id: decoded.userId }; // Attach userId to req.user for subsequent use in route handlers
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Error:", error);  // Log the error for debugging
        return res.status(400).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = isLoggedIn;
