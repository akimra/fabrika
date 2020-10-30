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
    const params = Object.assign(defaultOptions, query);

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
  },

  // создание продукта
  CreateProduct: async (article) => {
    let res;
    try {
      res = await models.Product.create(article);
    } catch (e) {
      res = {
        error: true,
        reason: e.message
      }
    }
    return res;
  },

  //получение продуктов
  GetProducts: async (query) => {
    let products;
    const { Product } = models;
    const defaultOptions = {
      sort_by: "createdAt",
      sort_dir: "asc",
    }
    // Перезаписываем дефолтные параметры выборки (при наличии кастомных в запросе)
    const params = Object.assign(defaultOptions, query);

    let options = GetFindOptions(params);

    try {
      products = await Product.findAll(options);
    }
    catch(e) {
      console.log('Error getting articles list in DbProvider: ', e);
      products = {error: true, reason: e.message};
    }

    return products;
  },

  //изменение продукта
  UpdateProduct: async (product) => {
    const { id, name, description, cost } = product;

    try {
      const oldProduct = await models.Profuct.findByPk(id);

      if (oldProduct) {
        if (name) oldProduct.name = name;
        if (description) oldProduct.description = description;
        if (cost) oldProduct.cost = cost;

        await oldProduct.save();
      } else {
        return {error: true, reason: '404'};
      }
    } catch (e) {
      return {error: true, reason: e.message};
    } finally {
      return {error: false};
    }
  },

  //удаление продукта
  DeleteProduct: async (id) => {
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