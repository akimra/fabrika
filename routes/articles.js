var express = require('express');
const qs = require('query-string');
var router = express.Router();
const DbProvider = require('../utils/database/dbProvider');
const db = new DbProvider();

router.get('/', async function(req, res) {
  const articles = await db.GetAllArticles(req.query);
  res.send(articles);
});

router.post('/', async function(req, res) {
  //TODO Validate here
  const article = await db.CreateArticle(req.body);

  if (article.error === true) {
    res.status(500);
    res.send({error: true, reason: article.reason.message});
  } else {
    res.send(article.Id);
  }
});

module.exports = router;
