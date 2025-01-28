const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt.js');
const user = require('../src/models/signUpModel');
const router = express.Router();
