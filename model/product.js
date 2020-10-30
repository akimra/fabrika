const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database/db');
const Article = require('./article');

const Product = sequelize.define("Product", {
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
Article.belongsTo(Product);

module.exports = Product;