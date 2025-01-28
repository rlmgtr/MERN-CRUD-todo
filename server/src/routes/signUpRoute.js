const express = require('express');
const router = express.Router();
const user = require('../models/signUpModel')

router.post('/', async (req, res) => {
    console.log(req.body);
const { firstName, lastName, email, password } = req.body;
const newUser = new user({ firstName, lastName, email, password });
await newUser.save();
res.status(201).send('Successfully Created User Account')
    
});

module.exports = router;