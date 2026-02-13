const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class PrivateMessage extends Model {}
const privateMessage = PrivateMessage.init(
  {
    sender: Sequelize.STRING,
    reciever: Sequelize.STRING,
    accelerator: Sequelize.STRING,
    message: Sequelize.STRING,
    file: Sequelize.STRING,
    file_type: DataTypes.INTEGER,
    url: Sequelize.STRING,
    seen: DataTypes.ENUM(0, 1),
    status: DataTypes.ENUM(0, 1),
    messageType: DataTypes.INTEGER,
    objType: DataTypes.INTEGER,
    objId: DataTypes.INTEGER,

    created_at: Sequelize.STRING,
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'private_message',
    modelName: 'private_message',
  }
);

module.exports = privateMessage;
