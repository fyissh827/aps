const mysql = require('mysql2/promise');
const { logger } = require('../helper/logger');
const bluebird = require('bluebird');
const moduleLogger = logger.child({ module: 'database' });



const dbConfig = {
  host: process.env.DB_HOST,
  user: "admin_np01track",
  password: "827qw935qw5",
  database: "admin_np01track",
  Promise: bluebird,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};


const con  =  mysql.createPool(dbConfig);
moduleLogger.debug({ con });



module.exports = con