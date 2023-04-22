
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qianshun',
    port: '3306',
    database: 'books'
});

module.exports = db