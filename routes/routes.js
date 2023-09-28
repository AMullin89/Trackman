const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const db = require('../data/database');

router.get('/', function (req, res) {
    //Display homepage
    res.render('index');
});

router.get('/signup', function (req, res) {
    //Display sign up page
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

if (existingUser[0]) {
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

    //Error message if no user details entered
    if (!enteredPassword || !enteredUsername){
       return res.render('loginerror');
    }

    //Get all LOS vehicles from database
    const [vehicle] = await db.query('SELECT * FROM vehicles WHERE los = 1')
    console.log(vehicle);
    //Retrieve user data if email is valid user
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', enteredUsername);
    //Handle incorrect username
    if (user[0] === undefined){
        return res.render('invaliduser');
    }
    
    //Compare entered password to stored hashed password
    const passwordsAreEqual = await bcrypt.compare(enteredPassword, user[0].password)

 

    //If log in is valid, create a session for the user
    if (passwordsAreEqual){

        req.session.user = { id: user[0].id, email: user[0].email};
        req.session.isAuthenticated = true;
        req.session.save(function (){
            res.render('map', {user: user, vehicle: vehicle});
        })
    //If log in is invalid, display error message
    } else {
        res.render('loginerror');
    }
});

router.get('/map', async function (req, res){

    //If session is authenticated then display map with vehicles
    if(req.session.isAuthenticated){
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', req.session.user.email);
        const [vehicle] = await db.query('SELECT * FROM vehicles WHERE los = 1')
        //***TO DO *** Struggling to display user information dynamically/
        res.render('map', {vehicle: vehicle, user: [user]});
    }
});

router.get('/add', async function (req, res) {
    //Open 'add new vehicle' page
    res.render('newvehicle');
});

router.post('/addvehicle', async function (req, res) {
    //Get new vehicle data
    const newVehicleData = [
        req.body.vrm,
        req.body.make,
        req.body.model,
        req.body.color,
        req.body.longitude,
        req.body.latitude
    ]
    //Build query for adding new vehicle to database
    const query = `INSERT INTO vehicles
                    (vrm, make, model, color, longitude, latitude)
                    VALUES (?)`
    //Insert new vehicle into database
    await db.query(query, [newVehicleData] );
    //Re-direct to map
    res.redirect('/map');
})


router.post('/update', async function (req, res){
    //Get vehicles from database
    const [vehicle] = await db.query('SELECT * FROM vehicles')
    //Pass vehicle information to dropdown box
    res.render('update', {vehicle: vehicle});

});

router.post('/updatecar', async function (req, res){
    //get inputted data
    const selectedVrm = req.body.dropdown;
    
    //store query for updating specific vehicle
    const updateVehicle = `UPDATE vehicles
                            SET longitude = ?, latitude = ?, los = ?
                            WHERE vrm = ?`
    //Store updated location data
    const updatedLocationData = [
        req.body.longitude,
        req.body.latitude,
        req.body.los
    ]
    
    //Update database with new location information and los status
    await db.query(updateVehicle, [updatedLocationData[0], updatedLocationData[1], updatedLocationData[2], selectedVrm] )
    res.redirect('/map');
});

//Handle log out requests
router.post('/logout',  function (req, res){

    //Clear session data
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
});

module.exports = router;