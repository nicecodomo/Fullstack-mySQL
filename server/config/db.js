// db.js
const mysql = require('mysql2');
require('dotenv').config();

// สร้างการเชื่อมต่อฐานข้อมูล
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'Z', // ตั้ง Timezone เป็น UTC
});

const promisePool = pool.promise();

module.exports = promisePool;