const express = require('express') 

const router = express.Router(); 


router.post('/signup', (req, res) => {
    res.send('sign up page')
});

router.post('/login', (req, res) => {
res.send('this is log in endpoint')
});







module.exports = router;


// https://www.youtube.com/watch?v=oJBu2k7OEk8&t=7392s
// 23:00