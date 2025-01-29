const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/signUpModel');

const login = async (req, res, next) => {
try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

const token = jwt.sign({userId: user._id}, process.env.SECRET, { 
    expiresIn: '8h',
});


return res.json({ token });

    } catch (error) {
console.error(error);
res.status(500).send('Server Error')
    }
};


module.exports = login