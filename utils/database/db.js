const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('fabrika', '', null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../storage/fabrika.db')
});

module.exports = sequelize;