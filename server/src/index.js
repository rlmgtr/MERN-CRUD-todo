const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const router = require('./router')



dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(router);







app.listen(8000);