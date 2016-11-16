var logger = require('./src/utils/logger');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  logger.info('Example app listening on port 3000!');
});
