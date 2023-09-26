const path = require('path');

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const favicon = require('express-favicon');

const options = {
    host: 'oliadkuxrl9xdugh.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    database: 'eucrzbyy9inxtgbj',
    user: 'b2j43yb83gtnq0af',
    password: 'mqh22vk93bq39ey9'
};

const sessionStore = new MySQLStore(options);

const routes = require('./routes/routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(favicon(__dirname + '/public/favicon.png'));



app.use(session({
    secret: 'evelyn',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
