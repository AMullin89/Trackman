const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'sql208.infinityfree.com',
    port: 3306,
    database: 'if0_35107377_vehicle_tracker',
    user: 'if0_35107377',
    password: 'hfXOEMxXI5'
});

module.exports = pool;