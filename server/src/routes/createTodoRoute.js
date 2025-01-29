const express = require('express');
const router = express.Router();
const todo = require('../models/createTodoModel');

router.post('/', async (req, res) => {
    try {
      const { toDo, isDone, remarks } = req.body;
      console.log({ toDo, isDone, remarks });
  
      const newTodo = new todo({ toDo, isDone, remarks });
      await newTodo.save();
      res.status(201).send('New Task added');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;