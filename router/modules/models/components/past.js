const sequelize = require("../../../../database/sequelize.js");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
 class Past extends Model {}
 const past = Past.init({
    user_id: Sequelize.STRING,
    name: Sequelize.STRING,
    type :DataTypes.INTEGER,
    file : Sequelize.STRING,
    date_1st : DataTypes.INTEGER,
    date_2nd : DataTypes.INTEGER,
    date_type : DataTypes.INTEGER,
    location : Sequelize.STRING,
    try : Sequelize.STRING,
    how : Sequelize.STRING,
    story : Sequelize.STRING,
    file_type : DataTypes.INTEGER,
    b1 : DataTypes.INTEGER,
    b2 : DataTypes.INTEGER,
    b3 : DataTypes.INTEGER,
   created_at :  DataTypes.TIME  
  
}, { sequelize, createdAt : false, updatedAt : false, tableName: 'past', modelName: 'past' });

module.exports = past;