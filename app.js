const path = require('path');

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	password: 'Evelyn18!',
    database: 'vehicle_tracker',
    user: 'root',
};

const sessionStore = new MySQLStore(options);

const routes = require('./routes/routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));



app.use(session({
    secret: 'evelyn',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
