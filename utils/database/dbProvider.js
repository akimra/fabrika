const models = require('../../model');
const sequelize = require('./db');
const { Sequelize } = require('sequelize');
const { GetFindOptions } = require('../optionsBuilder');

//sequelize.sync();

const DbProvider = {
  models,
  sequelize,

  // создание статьи
  CreateArticle: async (article) => {
    let res;
    try {
      res = await models.Article.create(article);
    } catch (e) {
      res = {
        error: true,
        reason: e.message
      }
    }
    return res;
  },

  //получение статей
  GetArticles: async (query) => {
    let articles;
    const { Article, Product } = models;
    const defaultOptions = {
      sort_by: "createdAt",
      sort_dir: "asc",
    }
    // Перезаписываем дефолтные параметры выборки (при наличии кастомных в запросе)
    const params = Object.assign(defaultOptions, query, {include: Product});

    let options = GetFindOptions(params);

    //Включаем продукты в выборку
    options = Object.assign(options, {include: Product});

    try {
      articles = await Article.findAll(options);
    }
    catch(e) {
      console.log('Error getting articles list in DbProvider: ', e);
      articles = {error: true, reason: e.message};
    }

    return articles;
  },

  //изменение статьи
  UpdateArticle: async (article) => {
    const { id, title, content, ProductId } = article;

    try {
      const oldArticle = await models.Article.findByPk(id);

      if (oldArticle) {
        if (title) oldArticle.title = title;
        if (content) oldArticle.content = content;

        if (typeof(ProductId) != "undefined") {
          oldArticle.ProductId = ProductId;
        }
        else if (article.Product != "undefined") {
          const newProduct = await models.Product.create(article.Product);
          oldArticle.setProduct(newProduct);
        }

        await oldArticle.save();
      } else {
        return {error: true, reason: '404'};
      }
    } catch (e) {
      return {error: true, reason: e.message};
    } finally {
      return {error: false};
    }
  },

  //удаление статьи
  DeleteArticle: async (id) => {
    try {
      const article = await models.Article.findByPk(id);

      if (article) {
        await article.destroy();
        await article.save();
      } else {
        return {error: true, reason: '404'};
      }
    } catch (e) {
      return {error: true, reason: e.message};
    } finally {
      return {error: false};
    }
  }


}

module.exports = DbProvider;