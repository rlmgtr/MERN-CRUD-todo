const mongoose = require('mongoose');

const todoSchema = {
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
}

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;