const mysql = require('mysql2/promise');
const { logger } = require('../helper/logger');
const bluebird = require('bluebird');
const moduleLogger = logger.child({ module: 'database' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',   // default if not set
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'admin_np01track',
  Promise: bluebird,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
console.log(dbConfig);
const con = mysql.createPool(dbConfig);
moduleLogger.debug({ con });

module.exports = con;