const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

const Article = sequelize.define("product", {
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