var request = require('request');
var config = require('../../config');
var logger = require('../utils/logger');

var baseRequest = request.defaults({
  baseUrl: 'https://stream.twitter.com/1.1/',
  headers: {
    'Accept': 'application/json'
  },
  oauth: {
    consumer_key: config.CONSUMER_KEY,
    consumer_secret: config.CONSUMER_SECRET,
    token: config.TOKEN,
    token_secret: config.TOKEN_SECRET
  },
  json: true
});

exports.stream = function () {
  var qs = {
    follow: '773582504183861248'
  };

  baseRequest({url:'/statuses/filter.json', qs: qs})
    .on('error', function (error) {
      logger.error('Error beginning stream', { error: error });
    }).on('data', function (data) {
      var tweet = data.toString('utf8');
      tweet = JSON.parse(tweet);
      logger.info(tweet);
    });
};
