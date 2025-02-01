const express = require('express');
const router = express.Router();
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const isLoggedIn = require('./middleware/isLoggedIn');
const createTodoRoute = require('./routes/createTodoRoute');
const readTodoRoute = require('./routes/readTodoRoute');
const updateTodoRoute = require('./routes/updateTodoRoute');

router.use('/signup', signUpRoute);

router.post('/login', loginRoute);

router.use('/todos',isLoggedIn, createTodoRoute);

router.use('/todos',isLoggedIn, readTodoRoute);

router.use('/todos', isLoggedIn, updateTodoRoute);


module.exports = router;
