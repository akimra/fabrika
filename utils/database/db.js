const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fabrika', '', null, {
  dialect: 'sqlite',
  storage: '../../storage/fabrika.db'
});

module.exports = sequelize;