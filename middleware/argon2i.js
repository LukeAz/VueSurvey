const argon2 = require('argon2');

module.exports = {
  hash: async (password) => {
    return (await argon2.hash(password, {
      type: argon2.argon2i, 
      timeCost: process.env.ARGON_TIMECOST,
      memoryCost: process.env.ARGON_MEMORYCOST,
      parallelism: process.env.ARGON_PARALLELISM
    })).split(`$argon2i$v=19$m=${process.env.ARGON_MEMORYCOST},t=${process.env.ARGON_TIMECOST},p=${process.env.ARGON_PARALLELISM}`)[1];
  },
  verify: async (password, hash) => {
    if(!await argon2.verify(`$argon2i$v=19$m=${process.env.ARGON_MEMORYCOST},t=${process.env.ARGON_TIMECOST},p=${process.env.ARGON_PARALLELISM}` + hash, password))
      throw {name:'wrong-credentials'};
  }
}