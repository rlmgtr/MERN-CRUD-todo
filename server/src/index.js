const express = require('express');

const app = express();

app.get('/todos', (req, res) => {
    res.send('this is test /todo path');
});

app.listen(8000);