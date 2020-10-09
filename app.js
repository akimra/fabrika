const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const productsRouter = require('./routes/products');
const articlesRouter = require('./routes/articles');

const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'http_access_log.txt'), {flags: 'a'});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// log errors in console
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400
}));
//log all requests to file
app.use(morgan('common', {
  stream: logStream
}));

app.use('/products', productsRouter);
app.use('/articles', articlesRouter);

module.exports = app;
