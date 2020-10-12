const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');
const Article = require('./article');

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(5000)
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Product.hasMany(Article);

module.exports = Product;