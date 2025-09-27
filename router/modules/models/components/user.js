const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class User extends Model {}
const user = User.init(
  {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    profilepic: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    lon: DataTypes.INTEGER,
    lat: DataTypes.INTEGER,
    role: Sequelize.STRING,
    origin: DataTypes.INTEGER,
    verified: DataTypes.ENUM('0', '1'),
    alertSeen: DataTypes.INTEGER,
    u_status: DataTypes.INTEGER,
    b_status: DataTypes.INTEGER,
    online: DataTypes.INTEGER,
    socket_id: Sequelize.STRING,
    device: Sequelize.STRING,
    online_at: DataTypes.INTEGER,
    created_at: DataTypes.TIME,
    profile_update: DataTypes.TIME,
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    timestamps: true,
    modelName: 'users',
  }
);

module.exports = user;
