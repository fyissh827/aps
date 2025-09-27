const sequelize = require('../../../../database/sequelize.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
class SearchHistory extends Model {}
const searchHistory = SearchHistory.init(
  {
    user_id: Sequelize.STRING,
    query: Sequelize.STRING,
    status: DataTypes.ENUM('0', '1'),
    search_at: DataTypes.TIME,
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: 'search_history',
    modelName: 'search_history',
  }
);

module.exports = searchHistory;
