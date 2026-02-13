const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class GrewtalesFile extends Model {}
const grewtalesFile = GrewtalesFile.init(
  {
    type: Sequelize.STRING,
    webMeta: Sequelize.STRING,
    parent: Sequelize.STRING,
    file: Sequelize.STRING,
    file_type: Sequelize.STRING,
    created_at: DataTypes.TIME,
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'grewtales_file',
    modelName: 'grewtales_file',
  }
);

module.exports = grewtalesFile;
