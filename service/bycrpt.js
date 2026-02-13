const bcrypt = require('bcryptjs');
const { has } = require('lodash');

const SECRET_KEY = process.env.BCRYPT_SECRET_KEY;
const SALT_ROUNDS = 10;

exports.bycrpt = () => {
  
  const set = async (password) => {
    if (!password) {
      throw new Error('Password is required');
    }
    const pepperedPassword = `${password}${SECRET_KEY}`;

    const hash = await bcrypt.hash(pepperedPassword, SALT_ROUNDS);
    return hash;
  };

  const check = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
      return false;
    }

    const pepperedPassword = `${password}${SECRET_KEY}`;
   let r = bcrypt.compare(pepperedPassword, hashedPassword);
    return r;
  };

  return { set, check };
};
