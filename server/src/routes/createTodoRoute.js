const express = require('express');
const router = express.Router();
const Todo = require('../models/createTodoModel'); // Ensure this path is correct

// Route to create a new todo
router.post('/', async (req, res) => {
    try {
        const { toDo, isDone, remarks } = req.body;

        // Validate input
        if (!toDo) {
            return res.status(400).send('toDo is required');
        }

        // Create a new Todo instance
        const newTodo = new Todo({ toDo, isDone, remarks });

        // Save the new Todo to the database
        await newTodo.save();

        // Respond with success message
        res.status(201).send('New Task added');
    } catch (error) {
        console.error('Error adding todo:', error); // Log detailed error
        res.status(500).send('Server error: ' + error.message);
    }
});

module.exports = router;
