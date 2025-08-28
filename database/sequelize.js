
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('admin_np01track', 'admin_np01track', '827qw935qw5', {
     host: 'localhost',
    dialect: 'mysql' 
   });
    //sequelize = new Sequelize("mysql::memory:");

   module.exports = sequelize;