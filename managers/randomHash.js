 const crypto = require('crypto');

exports.generateHash = async function(len = 12) {
 return   "fy." + crypto.randomBytes(len)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .substring(0, 16);
}