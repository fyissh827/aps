// logger.js
const winston = require('winston');
const LokiTransport = require('winston-loki');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new LokiTransport({
      host: 'http://loki:3100',   // Loki container name in Docker network
      labels: { app: 'fyish-api' },  // Important: label for queries
      json: true,
      timeout: 10000
    })
  ]
});

module.exports = logger;