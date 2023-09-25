const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'vehicle_tracker',
    user: 'root',
    password: 'Evelyn18!'
});

module.exports = pool;