var logger = require('./src/utils/logger');
// var twitterAPI = require('./src/api/twitterAPI');
// var twitterStream = require('./src/api/twitterStream');
// var parser = require('./src/api/twitterStream');
var Twit = require('twit');
var config = require('./config');

var T = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.TOKEN,
  access_token_secret: config.TOKEN_SECRET
});

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
  var listOfUsers = {
    follow: ['138526255','21447363','813286','16303106','1367531','807095']
  };

  // var stream = T.stream('statuses/filter', listOfUsers);
  //
  // stream.on('tweet', function (tweet) {
  //   console.log(tweet);
  // });
  res.render('index', { title: 'Tweets!' });
});

app.get('/user', function (req, res) {
  res.render('user', { title: 'This is a user\'s page' });
});

app.listen(3000, function () {
  logger.info('Example app listening on port 3000!');
  // twitterAPI.getUser();
  // var parserInstance = new parser();
  // parserInstance.stream();
});
