const redis =  require('redis');

const client = redis.createClient();
client.connect();
client.on('error', (err) => console.info('Redis Client Error', err));
client.on('connect', () => console.info('connected'));
module.exports = client