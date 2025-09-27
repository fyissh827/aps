const { Sequelize } = require('sequelize');

// Read DB credentials from environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME || 'admin_np01track',
  process.env.DB_USER || 'admin_np01track',
  process.env.DB_PASSWORD || '827qw935qw5',
  {
    host: process.env.DB_HOST || 'localhost', // use env variable
    dialect: 'mysql',
    logging: console.log, // optional: log SQL queries
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
