const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class Notification extends Model {}
const notification = Notification.init(
  {
    user_id: DataTypes.INTEGER,
    message: Sequelize.STRING,
    type: DataTypes.INTEGER,
    data_id: DataTypes.INTEGER,
    external: DataTypes.STRING,
    status: DataTypes.ENUM('0', '1'),
    created_at: DataTypes.TIME,
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'notification',
    modelName: 'notification',
  }
);

module.exports = notification;
