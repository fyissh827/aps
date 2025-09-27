const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class GlobalComment extends Model {}
const globalComment = GlobalComment.init(
  {
    primitive_id: Sequelize.STRING,
    accelerator: Sequelize.STRING,
    user_id: Sequelize.STRING,
    message: Sequelize.STRING,
    grewtale: Sequelize.STRING,
    type: DataTypes.INTEGER,
    iso: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    standard: DataTypes.INTEGER,
    file: Sequelize.STRING,
    file_type: DataTypes.INTEGER,
    status: DataTypes.ENUM(0, 1),
    c_status: DataTypes.ENUM(0, 1),
    report: DataTypes.INTEGER,
    created_at: DataTypes.TIME,
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'global_comment',
    modelName: 'global_comment',
  }
);

module.exports = globalComment;
