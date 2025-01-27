const mongoose = require('mongoose');

const userSignUpSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
}, { versionKey: false });

const user = mongoose.model('user', userSignUpSchema);

module.exports = user;
