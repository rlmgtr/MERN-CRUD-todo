const mongoose = require('mongoose');

const todoSchema = {
    todo: {
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

const todo = mongoose.model(todo, todoSchema)