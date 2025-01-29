const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  toDo: {
    type: String, 
    required: true,
  },

  isDone: {
    type: Boolean,
    default: false,
  },

  remarks: {
    type: String, 
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
