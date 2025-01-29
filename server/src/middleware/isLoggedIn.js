const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Token not found");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send('Invalid token');
    }
};

module.exports = isLoggedIn;
