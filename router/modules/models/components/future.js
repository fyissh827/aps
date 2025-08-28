const sequelize = require("../../../../database/sequelize.js");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
 class Future extends Model {}
 const future = Future.init({
    user_id: Sequelize.STRING,
    name: Sequelize.STRING,
    type :DataTypes.INTEGER,
    file : Sequelize.STRING,
    file_type : DataTypes.INTEGER,
    date_1st : DataTypes.INTEGER,
    date_2nd : DataTypes.INTEGER,
    date_type : DataTypes.INTEGER,
    location : Sequelize.STRING,
    try : Sequelize.STRING,
    b1 : DataTypes.INTEGER,
    b2 : DataTypes.INTEGER,
    b3 : DataTypes.INTEGER,
   created_at :  DataTypes.TIME  
  
}, { sequelize, createdAt : false, updatedAt : false, tableName: 'future', modelName: 'future' });

module.exports = future;