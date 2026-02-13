const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class user_messaging_rules extends Model {}
const user_messaging_rules_ = user_messaging_rules.init(
  {
    user_id: DataTypes.INTEGER,
    rules: DataTypes.INTEGER,
    set_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'user_messaging_rules',
    modelName: 'user_messaging_rules',
  }
);

module.exports = user_messaging_rules_;
