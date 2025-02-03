const express = require ('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Todo = require('../models/createTodoModel')

router.patch('/:id', isLoggedIn, async (req, res) => {

    try {
        const { id } = req.params;
        const { toDo, isDone, remarks } = req.body;

const todo = await Todo.findOne({ _id: id, user: req.user.id });

if (!todo) {
    return res.status(400).json({ message: 'Task not found' });
}

 if (toDo !== undefined) todo.toDo = toDo;
 if (isDone !== undefined) todo.isDone = isDone;
 if (remarks !== undefined) todo.remarks = remarks;

await todo.save();

res.status(200).json({ message: 'Task successfully updated', todo });

}catch (error) {
    res.status(500).json({ message: 'internal server error', error: error.error.message })
}

});


module.exports = router


