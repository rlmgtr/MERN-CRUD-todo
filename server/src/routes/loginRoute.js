const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/signUpModel');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate JWT token, include userId in the token payload
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { 
            expiresIn: '8h', // Set expiration as needed
        });

        // Send token in the response
        return res.json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
};

module.exports = login;
