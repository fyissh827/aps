const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
  }
});

client.connect();

client.on('error', (err) => console.info('Redis Client Error', err));
client.on('connect', () => console.info('Redis connected'));

module.exports = client;