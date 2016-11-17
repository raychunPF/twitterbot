var request = require('request');
var config = require('../../config');
var logger = require('../utils/logger');

var baseRequest = request.defaults({
  baseUrl: 'https://stream.twitter.com/1.1/',
  oauth: {
    consumer_key: config.CONSUMER_KEY,
    consumer_secret: config.CONSUMER_SECRET,
    token: config.TOKEN,
    token_secret: config.TOKEN_SECRET
  },
  encoding: 'utf8'
});

var parser = function () {
  this.tweet = '';
  this.remainingLength = 0;
};

parser.prototype.stream = function () {
  // Ray's id -> 773582504183861248
  var qs = {
    follow: '138526255,21447363,813286,16303106,1367531,807095',
    delimited: 'length'
  };

  baseRequest({url:'/statuses/filter.json', qs: qs})
    .on('error', function (error) {
      logger.error('Error beginning stream', { error: error });
    }).on('data', function (data) {
      if (data === '\r\n' || data === '\n\r' || data === '\n' || data === '\r') {
        // No data, do nothing
        logger.info('nothing returned!');
      } else if (data.indexOf('Exceeded connection limit for user') !== -1) {
        logger.info('exceeded limit, calm down~');
      } else {
        var messageLength = parseInt(data, 10);
        console.log('messageLength: ' + messageLength);
        // New tweet
        if (!isNaN(messageLength)) {
          console.log("NEW TWEET");
          this.remainingLength = messageLength;
          var messageLengthString = messageLength.toString();
          // To cut the string, account for \r\n at the end of messageLength
          var parsedString = data.substr(messageLengthString.length + 2);
          this.tweet += parsedString;
          console.log("Parsed String: " + parsedString);
          this.remainingLength -= parsedString.length;
          if (this.remainingLength === 0) {
            // Tweet fully parsed
            logger.info(this.tweet);
            this.tweet = '';
          }
        } else {
          console.log("PART OF OLD TWEET");
          this.tweet += data;
          // TODO: The data might end but also start a new tweet!
          // Instead of adding data, substr it to the remaining length,
          // repeat the process
          this.remainingLength -= data.length;
          if (this.remainingLength === 0) {
            // Tweet fully parsed
            logger.info(this.tweet);
            this.tweet = '';
          }
        }
      }
    });
};

module.exports = parser;
