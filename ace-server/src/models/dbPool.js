// models/dbPool.js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "ezen",
  password: process.env.PASSWORD,
  database: "edudb",
  connectionLimit: 10,
  waitForConnections: true,
});
module.exports = pool;
