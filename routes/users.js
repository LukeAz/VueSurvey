const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const auth = require('../middleware/auth');
const argon2i = require('../middleware/argon2i');
const jwt = require('../middleware/jwt');
const db = require('../db/db');

router.post('/login', (req, res, next) => {
  if(req.body.username === undefined || req.body.password === undefined)
    return next({name: "wrong-credentials"});

  db.getUserPassword(req.body.username).then((hash) => {
    argon2i.verify(req.body.password, hash).then(() => {
      jwt.sign({username: req.body.username}).then((token) => {
        res.cookie('access_token', token, {httpOnly: true, secure: true, sameSite: 'Strict', expires: new Date(Date.now() + 10*60*60*1000)});
        res.cookie('logged', 'yes', {secure: true, sameSite: 'Strict', expires: new Date(Date.now() + 10*60*60*1000)});
        res.json({error: false, message: "ok"});
      }).catch(() => next({name: "unauthorized"}));
    }).catch(() => next({name: "wrong-credentials"}));
  }).catch(() => next({name: "wrong-credentials"}));
});

router.post('/register', (req, res, next) => {
  let passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*-_\\/\[\]]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  let usernameRegex = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,20}$/;

  if(req.body.password != req.body.passwordcheck)
    next({name: "password-not-match"});
  else if(!usernameRegex.test(req.body.username))
    next({name: "username-regex-error"});
  else if(!passwordRegex.test(req.body.password))
    next({name: "password-regex-error"});
  else {
    argon2i.hash(req.body.password).then((hash) => {
      db.createAccount(req.body.username, hash).then(() => {
        jwt.sign({username: req.body.username}).then((token) => {
          res.cookie('access_token', token, {httpOnly: true, secure: true, sameSite: 'Strict', expires: new Date(Date.now() + 10*60*60*1000)});
          res.cookie('logged', 'yes', {secure: true, sameSite: 'Strict', expires: new Date(Date.now() + 10*60*60*1000)});
          res.json({error: false, message: "ok"});
        }).catch(() => next({name: "unathorized"}));
      }).catch(() => next({name: "username-already-used"}));
    }).catch(() => next({name: "unathorized"}));
  }
});

router.get('/data', auth.isAuthorized, (req, res) => {
  db.getUserData(req.user.username).then((data) => {
    res.json(data);
  }).catch((e) => next(e));
});

router.post('/edit/password', auth.isAuthorized, csrfProtection, (req, res, next) => {
  let passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*-_\\/\[\]]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  if(req.body.password != req.body.passwordcheck)
    next({name: "password-not-match"});
  else if(!passwordRegex.test(req.body.password))
    next({name: "password-regex-error"});
  else {
    db.getUserPassword(req.user.username).then((hash) => {
      argon2i.verify(req.body.oldpassword, hash).then(() => {
        argon2i.hash(req.body.password).then((hash) => {
          db.updatePassword(req.user.username, hash).then(() => {
            res.json({error: false, message: 'ok'});
           }).catch((e) => next(e));
        }).catch((e) => next(e));   
      }).catch((e) => next(e));
    }).catch((e) => next(e));
  }
});

router.post('/delete', auth.isAuthorized, csrfProtection, (req, res, next) => {
  if(req.user === undefined)
    return next({name: "unathorized"})
  
  db.deleteAccount(req.user.username).then(() => {
    res.clearCookie('access_token');
    res.clearCookie('logged');
    res.json({error: false, message: "ok"});
  }).catch(() => next({name: "unathorized"}));
});

router.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('logged');
  res.json({error: false, message: "ok"});
});

module.exports = router;