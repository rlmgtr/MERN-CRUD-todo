const express = require('express');
const router = express.Router();
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const isLoggedIn = require('./middleware/isLoggedIn');
const createTodoRoute = require('./routes/createTodoRoute');


router.use('/signup', signUpRoute);


router.post('/login', loginRoute);


router.post('/todos', createTodoRoute);




module.exports = router;
