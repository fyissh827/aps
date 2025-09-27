const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class Grewtales extends Model {}
const grewtales = Grewtales.init(
  {
    primitive_id: Sequelize.STRING,
    accelerator: Sequelize.STRING,
    type: DataTypes.ENUM(0, 1),
    user_id: Sequelize.STRING,
    w_n: Sequelize.STRING,
    content: DataTypes.INTEGER,
    standard: DataTypes.INTEGER,
    privacy: DataTypes.INTEGER,
    p1: DataTypes.INTEGER,
    p2: DataTypes.INTEGER,
    p3: DataTypes.INTEGER,
    p4: DataTypes.INTEGER,
    p5: DataTypes.INTEGER,
    p6: DataTypes.INTEGER,
    p7: DataTypes.INTEGER,
    p8: DataTypes.INTEGER,
    p0: DataTypes.INTEGER,
    g_status: DataTypes.ENUM(0, 1),
    report: DataTypes.INTEGER,

    days: DataTypes.INTEGER,

    created_at: DataTypes.TIME,
    suspended: DataTypes.TIME,
  },
  { sequelize, createdAt: false, updatedAt: false, modelName: 'grewtales' }
);

module.exports = grewtales;
