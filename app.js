const https = require('https');
const fs = require('fs');
const sslkey = fs.readFileSync('cacert/ca.key', 'utf8');
const sslcert = fs.readFileSync('cacert/ca.crt', 'utf8');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const robots = require('express-robots-txt');
require("./db/db").initialize();

const app = express();
app.use(cookieParser());
app.use(compression());
app.use(robots({UserAgent: '*', Allow: '/'}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended: false}));
app.use(express.static('dist'));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    'img-src': ["'self'", "data:", "surveyjs.io"],
    'style-src': ["'self'", "'unsafe-inline'"], 
    'font-src': ["'self'", "fonts.gstatic.com"],
    'scriptSrc': ["'self'", "'unsafe-eval'"]
  }
}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// ROUTERS
const users = require('./routes/users');
const surveys = require('./routes/surveys');
const security = require('./routes/security');
app.use('/api/users', users);
app.use('/api/surveys', surveys);
app.use('/api/security', security);

// DEFAULT PAGE
app.all('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  let allowed = ["unauthorized", "wrong-credentials", "username-already-used", "password-not-match", "username-regex-error", "password-regex-error", "missing-parameter"];
  if(allowed.indexOf(err.name) != -1) {
    res.status(500).json({error: true, message: err.name});
  } else {
    console.log(err);
    res.status(500).json({error: true, message: "internal-error"});
  }
});

https.createServer({key: sslkey, cert: sslcert}, app).listen(process.env.PORT, () => {
  console.log("Server running on https://127.0.0.1:" + process.env.PORT);
});
