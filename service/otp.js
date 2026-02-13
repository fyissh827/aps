
const crypto = require('crypto');
exports.otp = async() => {

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const length = 8;
const bytes = crypto.randomBytes(length);
const otp = Array.from(bytes, b => alphabet[b % 26]).join('');
  
  return otp;
}

        
