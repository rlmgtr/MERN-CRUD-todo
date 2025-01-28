const express = require('express') 
const router = express.Router(); 
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');

router.use('/signup', signUpRoute);

router.post('/login', loginRoute);







module.exports = router;


