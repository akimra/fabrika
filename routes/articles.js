var express = require('express');
const qs = require('query-string');
var router = express.Router();
const DbProvider = require('../utils/database/dbProvider');
const db = new DbProvider();

router.get('/', async function(req, res) {
  let query = req.query;
  res.send(await db.GetAllArticles());
});

module.exports = router;
