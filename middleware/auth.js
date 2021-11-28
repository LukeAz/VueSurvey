const jwt = require('./jwt');
const query = require('../db/db');

module.exports = {
  isAuthorized: (req, res, next) => {
    jwt.verify(req.cookies.access_token).then((payload) => {
      query.getUserData(payload.username).then((user) => {
        if(user != undefined) {
          req.user = user;
          next();
        } else {
          next({name: "unauthorized"});
        }
      }).catch(() => next({name: "unauthorized"}));
    }).catch(() => next({name: "unauthorized"}));
  }   
}