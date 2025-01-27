const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/signUpModel'); // Ensure this points to your user model
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find user by username
    const user = await User.findOne({ userName });
    
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare entered password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set expiration time
    });

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
