require('dotenv').config()

var host = process.env.MYSQL_HOST
if(process.env.NODE_ENV != "production") {
  host = '127.0.0.1'
}

// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: host,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: "utf8mb4",
  collation: "utf8mb4_unicode_ci"
})

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});
