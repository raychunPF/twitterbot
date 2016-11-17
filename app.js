var logger = require('./src/utils/logger');
var twitterAPI = require('./src/api/twitterAPI');
// var twitterStream = require('./src/api/twitterStream');
var parser = require('./src/api/twitterStream');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  logger.info('Example app listening on port 3000!');
  // twitterAPI.getUser();
  var parserInstance = new parser();
  parserInstance.stream();
});
