const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.get ('/signup', function (req, res) {
    res.render('signup');
});

router.get('/map', function (req, res){
    res.render('map');
})

module.exports = router;