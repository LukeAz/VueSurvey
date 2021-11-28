const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const auth = require('../middleware/auth');

router.get("/csrf", auth.isAuthorized, csrfProtection, (req, res) => {
  return res.json({ csrf: req.csrfToken() });
});

module.exports = router;