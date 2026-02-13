// redisToken.js
const redisClient = require('../database/redis.js'); // adjust path if needed

const DEFAULT_TTL = 24 * 60 * 60 * 60; // 60 days (you can change)

class RedisToken {
  static instance;

  constructor(prefix = 'token') {
    if (RedisToken.instance) {
      return RedisToken.instance;
    }

    this.prefix = prefix;
    RedisToken.instance = this;
  }

  _getKey(key) {
    return `${this.prefix}:${key}`;
  }

  // Check key existence
  async exists(key) {
    const redisKey = this._getKey(key);
    const result = await redisClient.exists(redisKey);
    return result === 1;
  }

  // Delete token
  async delete(key) {
    const redisKey = this._getKey(key);
    return await redisClient.del(redisKey);
  }

  // Get token value
  async get(key) {
    const redisKey = this._getKey(key);
    const result = await redisClient.get(redisKey);
    return result ?? null;
  }

  /**
   * Put token with optional TTL
   * Overwrites existing key
   */
  async put(key, value, ttl = DEFAULT_TTL) {
    try {
      const redisKey = this._getKey(key);
        const result = await redisClient.set(redisKey, value, {
        EX: ttl,
        NX: true, // insert only if key does not exist
      });

      return result === "OK";
    } catch (e) {
      return false;
    }
  }
}

module.exports = new RedisToken();
