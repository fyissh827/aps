const sequelize = require("../../../../database/sequelize.js");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
 class user_messaging_requests extends Model {}
 const user_messaging_requests_ = user_messaging_requests.init({
   
    user_to : DataTypes.INTEGER,
    user_from : DataTypes.INTEGER,
   status :  DataTypes.ENUM("1", "2")  
  
}, { sequelize, createdAt : false, updatedAt : false, tableName: 'user_messaging_requests', modelName: 'user_messaging_requests' });

module.exports = user_messaging_requests_;