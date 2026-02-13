// redisSignin.js
const redisClient = require('../database/redis.js');

const { bycrpt } = require('../service/bycrpt.js');
const { jwtUtils } = require('../service/jwt.js');

const TTL_24_HOURS = 24 * 60 * 60; // seconds
const MAX_TRIES = 2;

class RedisPasswordRecovery {
  static instance;

  constructor(prefix = 'passwordrecovery') {
    if (RedisPasswordRecovery.instance) {
      return RedisPasswordRecovery.instance;
    }

    this.prefix = prefix;
    RedisPasswordRecovery.instance = this;
  }

  _getKey(key) {
    return `${this.prefix}:${key}`;
  }

  // Check only key existence
  async exists(key) {
    const redisKey = this._getKey(key);
    const result = await redisClient.exists(redisKey);
    return result === 1;
  }

  async delete(key) {
    const redisKey = this._getKey(key);
    const result = await redisClient.del(redisKey);
    return result;
  }
  
  
  async get(key) {
    const redisKey = this._getKey(key);
    return (await redisClient.get(redisKey)) ?? null;
  }

  /**
   * Put OTP only if key does NOT exist
   * TTL = 24 hours
   * time starts from 0
   */
  async put(key, otp, email, otpTryTime = 0, emailingTime = 0) {
  const redisKey = this._getKey(key);
  const exists = await redisClient.exists(redisKey);
  if (exists === 1) {
    await redisClient.del(redisKey);
  }

  const encryptedOtp = await bycrpt().set(otp);

  const value = JSON.stringify({
    encryptedOtp,
    email,
    otpTryTime: otpTryTime,
    emailingTime : emailingTime
  });

  const result = await redisClient.set(redisKey, value, {
    EX: TTL_24_HOURS,
  });

  return result === "OK";
}


  /**
   * Check OTP
   * Max attempts = 2
   */
  async checkOtp(key, otp) {
    const redisKey = this._getKey(key);
    const value = await redisClient.get(redisKey);
      
    if (!value) return 0;

    let data = JSON.parse(value);
    data.otpTryTime = (data.otpTryTime || 0) + 1;
    console.log(data);
    // If time reaches 2, delete key and always return false
   let bcryptResponse =  await bycrpt().check(otp, data.encryptedOtp);

    if (data.otpTryTime > 3 && !bcryptResponse) {
      await redisClient.del(redisKey);
      return 2;
    }else if(bcryptResponse){     
     return await jwtUtils(120).encodeJWT({email : data.email});  
    }else{
      const ttl = await redisClient.ttl(redisKey);
     await redisClient.set(redisKey, JSON.stringify(data), {
      EX: ttl > 0 ? ttl : TTL_24_HOURS,
    });
      return 1;
    }

  }
}

module.exports = new RedisPasswordRecovery();
