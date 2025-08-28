const sequelize = require("../../../../database/sequelize.js");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
 class Subject extends Model {}
 const subject = Subject.init({
    user_id: Sequelize.STRING,
    name: Sequelize.STRING,
    meaning: Sequelize.STRING,
    type :DataTypes.INTEGER,
    file : Sequelize.STRING,
    file_type : DataTypes.INTEGER,
   
   created_at :  DataTypes.TIME  
  
}, { sequelize, createdAt : false, updatedAt : false, tableName: 'subject', modelName: 'subject' });

module.exports = subject;