const models = require('../../model');
const sequelize = require('./db');
const { Sequelize } = require('sequelize');
const { GetFindOptions } = require('../optionsBuilder');

module.exports = class DbProvider {
  constructor() {
    this.models = models;
    this.sequelize = sequelize;
    this.sequelize.sync({force: true});
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
    const params = Object.assign(defaultOptions, query);

    const options = GetFindOptions(params);

    try {
      articles = await this.models.Article.findAll(options);
    }
    catch(e) {
      console.log('Error getting articles list in DbProvider: ', e);
      articles = {error: true, reason: e};
    }

    return articles;
  }
}