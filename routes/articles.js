var express = require('express');
const qs = require('query-string');
var router = express.Router();
const DbProvider = require('../utils/database/dbProvider');
const db = new DbProvider();

router.get('/', async function(req, res) {
  const articles = await db.GetAllArticles(req.query);
});

module.exports = router;
