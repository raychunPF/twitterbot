var request = require('request');
var config = require('../../config');
var logger = require('../utils/logger');

var baseRequest = request.defaults({
  baseUrl: 'https://api.twitter.com/1.1/',
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

exports.getUser = function () {
  var qs = {
    screen_name: 'nytimes'
  };

  baseRequest({uri:'/users/lookup.json', qs: qs}, function (e, r, b) {
    if (!e && r.statusCode === 200) {
      logger.info('found user', { id: b[0].id_str });
    } else {
      logger.error('could not find user');
    }
  });
};
