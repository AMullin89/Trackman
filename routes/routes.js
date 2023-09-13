const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const db = require('../data/database');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

//Handle storing sign up information in database

router.post('/signup', async function (req, res) {

//Check if entered password is valid and matches confirm password
const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const isValid = regex.test(req.body.password);

if (!isValid || req.body.password !== req.body["confirm-password"]){
    return res.render('invalidpassword');
};

//Hash user's password
let hashedPassword = await bcrypt.hash(req.body.password, 10);

//Store user's inputted data
const userData = [
    req.body.firstname,
    req.body.lastname,
    req.body.username,
    hashedPassword
];

//Check if email is already in use by another user
const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', req.body.username);

if (existingUser[0].email) {
   return res.render('existinguser');
} else {
//Send user details to database
    await db.query(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?)',
         [userData]
        );
    
    res.redirect('/');
}
});

//Handle sign in requests
router.post('/signin', async function (req, res) {
    //Get users log in details
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;


    const [vehicle] = await db.query('SELECT * FROM vehicles WHERE los = 1')
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', enteredUsername);

    const passwordsAreEqual = await bcrypt.compare(enteredPassword, user[0].password)

    if (passwordsAreEqual){
        res.render('map', {user: user, vehicle: vehicle});
    } else {
        res.render('loginerror');
    }

    
});

router.get('/map', function (req, res){
    res.render('map');
})

module.exports = router;