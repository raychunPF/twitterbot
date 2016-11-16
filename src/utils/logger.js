// Imports
var winston = require('winston');

// Static variables
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
    new winston.transports.File({
      name: 'error-log',
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      name: 'test-log',
      filename: 'logs/test.log',
      level: 'info'
    })
  ]
});

module.exports = logger;
