const models = require('../../model');
const sequelize = require('./db');
const { Sequelize } = require('sequelize');

module.exports = class DbProvider {
  constructor() {
    this.models = models;
    this.sequelize = sequelize;
  }

  CreateArticle = async () => {
    
  }
}