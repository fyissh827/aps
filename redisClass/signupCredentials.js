// redisSignin.js
const redisClient = require('../database/redis.js'); // adjust path if needed
const { bycrpt } = require('../service/bycrpt.js');

const TTL_48_HOURS = 24 * 60 * 60; // seconds

class RedisSignin {
  static instance;

  constructor(prefix = 'signin') {
    if (RedisSignin.instance) {
      return RedisSignin.instance;
    }

    this.prefix = prefix;
    RedisSignin.instance = this;
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
    const result = await redisClient.get(redisKey) ?? null;
    return result;
  }

  /**
   * Put OTP only if key does NOT exist
   * Initializes time = 0
   * TTL = 48 hours
   */
  async put(key, otp, document, otpTryTime = 0, emailingTime = 0) {
    try{
    const redisKey = this._getKey(key);
    const exists = await redisClient.exists(redisKey);
  if (exists === 1) {
    await redisClient.del(redisKey);
  }
    const encrptOtp = await bycrpt().set(otp);
    const value = JSON.stringify({
      encrptOtp,
      document,
    otpTryTime: otpTryTime,
    emailingTime : emailingTime
    });

    const result = await redisClient.set(redisKey, value, {
      EX: TTL_48_HOURS,
      NX: true, // insert only if key does not exist
    });
    
     return result === "OK";
  }catch(e){
   
     return false;
  }

    // true if inserted, false if key exists
  }

  // Check OTP and increment time on every check
  async checkOtp(key, otp) {
    const redisKey = this._getKey(key);
    const value = await redisClient.get(redisKey);
      if (!value) return 0;
         
    let data = JSON.parse(value);
    data.otpTryTime = (data.otpTryTime || 0) + 1;

    // If time reaches 2, delete key and always return false
   let bcryptResponse =  await bycrpt().check(otp, data.encrptOtp);
  // console.log(bcryptResponse);
   if ((data.otpTryTime >= 3 && bcryptResponse) || (data.otpTryTime > 3 && !bcryptResponse)) {
      return 2;
    }else if(bcryptResponse){
     return data?.document;  
    }else{
      const ttl = await redisClient.ttl(redisKey);
     await redisClient.set(redisKey, JSON.stringify(data), {
      EX: ttl > 0 ? ttl : TTL_48_HOURS,
    });
      return 1;
    }

  }
}


module.exports = new RedisSignin();
