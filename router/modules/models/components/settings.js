const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class Settings extends Model {}
const settings = Settings.init(
  {
    user_id: Sequelize.STRING,
    privacy: DataTypes.INTEGER,
    search_history: DataTypes.INTEGER,
    vibration: DataTypes.ENUM('0', '1'),
    sound: DataTypes.ENUM('0', '1'),
    status: DataTypes.ENUM('0', '1'),
    messaging: DataTypes.ENUM('0', '1', '2', '3'),
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'settings',
    modelName: 'settings',
  }
);

module.exports = settings;
