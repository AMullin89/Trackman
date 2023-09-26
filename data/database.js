const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'oliadkuxrl9xdugh.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    database: 'eucrzbyy9inxtgbj',
    user: 'b2j43yb83gtnq0af',
    password: 'mqh22vk93bq39ey9'
});

module.exports = pool;