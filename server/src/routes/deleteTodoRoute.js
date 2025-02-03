const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Todo = require('../models/createTodoModel');

router.delete('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure req.user._id is available
        console.log("User ID from req.user:", req.user);  // Debug log

        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task successfully deleted', todo });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;