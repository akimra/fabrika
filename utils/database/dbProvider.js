const models = require('../../model');
const sequelize = require('./db');
const { Sequelize } = require('sequelize');
const { GetFindOptionsForTotal } = require('../optionsBuilder');

module.exports = class DbProvider {
  constructor() {
    this.models = models;
    this.sequelize = sequelize;
  }

  CreateArticle = async (ProductId, title, content) => {
    
  }

  GetAllArticles = async (query) => {
    let articles;
    const defaultOptions = {
      sort_by: "createdAt",
      sort_dir: "asc"
    }
    // Перезаписываем дефолтные параметры выборки (при наличии кастомных в запросе)
    const params = Object.assign(defaultParams, query);

    const options = GetFindOptionsForTotal(params);

    try {
      articles = await models.Article.findAll(options);
    }
    catch(e) {
      console.log('Error getting articles list in DbProvider: ', e);
      articles = {error: true, reason: e};
    }

    return articles;
  }
}