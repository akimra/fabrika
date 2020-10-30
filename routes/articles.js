var express = require('express');
const qs = require('query-string');
var router = express.Router();
const db = require('../utils/database/dbProvider');
//const db = DbProvider;

router.get('/', async function(req, res) {
  const articles = await db.GetArticles(req.query);
  res.send(articles);
});

router.post('/', async function(req, res) {
  //TODO Validate here
  const article = await db.CreateArticle(req.body);

  if (article.error) {
    res.status(500).json(article);
  } else {
    res.send(article.Id);
  }
});

router.patch('/', async function(req, res) {
  //TODO Validate here
  const article = await db.UpdateArticle(req.body);

  if (article.error) {
    if (article.error.reason === '404') res.status(404).end;
    else res.status(500).json(article);
  } else {
    res.status(200).end();
  }
});

router.delete('/', async (req, res) => {
  
})

module.exports = router;
