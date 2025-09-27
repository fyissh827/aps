const bunyan = require('bunyan');
const packageJson = require('../package.json');

const logger = bunyan.createLogger({
  name: packageJson.name,
  version: packageJson.version,
  corporate: packageJson.corporate,
  Author: packageJson.Author,
  streams: [
    {
      stream: process.stdout,
      level: process.env.NODE_ENV !== 'test' ? bunyan.TRACE : bunyan.FATAL,
    },
  ],
});
logger.info({ NODE_ENV: process.env.NODE_ENV }, 'API logger loaded');

module.exports = { bunyan, logger };
