const fs = require('fs');
const jwt = require('jsonwebtoken');

const key = fs.readFileSync('./cacert/RS256.key', 'utf8');
const pub = fs.readFileSync('./cacert/RS256.pub', 'utf8');  
const option = {
  algorithm: 'RS256',
  expiresIn: '10h'
}

module.exports = {
  sign: async (payload) => {
    return await jwt.sign(payload, key, option);
  },
  verify: async (token) => {
    return await jwt.verify(token, pub, option);
  }
}