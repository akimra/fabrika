const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database/db');

const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(5000),
    allowNull: false
  }
});

module.exports = Article;