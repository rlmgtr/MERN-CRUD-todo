const express = require('express');
const router = express.Router();
const Todo = require('../models/createTodoModel');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, async (req, res) => {
try { 
const todos = await Todo.find({ userId: req.user._id});

if (!todos.length) {
    return res.status(404).json({ message: 'No to dos found'});
    }
res.status(200).json(todos);
} catch (error) {

console.error('error fetching todos', error);
res.status(500).json({ message: 'Server error', error: error.message});
}
})

module.exports = router;