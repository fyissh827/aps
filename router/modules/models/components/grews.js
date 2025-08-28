const sequelize = require("../../../../database/sequelize.js");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
 class Grews extends Model {}
 const grews = Grews.init({
    primitive_id: Sequelize.STRING,
    title: Sequelize.STRING
  
}, { sequelize, createdAt : false, updatedAt : false,  key: 'primitive_id', tableName: 'grews', modelName: 'grews' });

module.exports = grews;