const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

 // 5 minutes

exports.jwtUtils = (min) => {
    const MAX_LIFE_SECONDS = min * 60;
  /**
   * Encode (sign) JWT
   * @param {object} payload
   * @returns {string}
   */
  const encodeJWT = async(payload) => {
    return jwt.sign(payload, SECRET, {
      algorithm: "HS256",
      expiresIn: MAX_LIFE_SECONDS,
    });
  };

  /**
   * Decode & verify JWT
   * @param {string} token
   * @returns {object}
   */
  const decodeJWT = async(token) => {
    let payload = null;
    try{
     payload = jwt.verify(token, SECRET, {
      algorithms: ["HS256"],
      maxAge: MAX_LIFE_SECONDS,
    });
  }catch(e){
     payload = null;
  }
  return payload;
  };

  return {
    encodeJWT,
    decodeJWT,
  };
};
