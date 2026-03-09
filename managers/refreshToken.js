const jwt = require('jsonwebtoken');
const { encode } = require('../service/encodeForToken');
const redisToken = require('../redisClass/redisToken');

exports.refreshToken = async(id, email, system) => {

let randomId =  await encode(JSON.stringify({id, email}));
let result = await redisToken.put(randomId, system);
if(!result) return null;
const now = Math.floor(Date.now() / 1000);
const payload = {
  userID: "user_" + id,
  tokenID : randomId,
  iat: now
  
};
const secretKey = process.env.REFRESHTOKEN_KEY; 
const token = jwt.sign(payload, secretKey, {
  expiresIn: "60d"  

});
return token;
}