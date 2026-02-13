const { logger } = require('../helper/logger');
const moduleLogger = logger.child({ module: 'Model' });
const res = require('response');
const _ = require('lodash');
const response = (data) => {
  moduleLogger.debug(data, 'DATA RESPONSE');
};

module.exports = {
  response,
};
