const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const auth = require('../middleware/auth');
const db = require('../db/db');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const DOMPurify = createDOMPurify(new JSDOM('').window);
const ALLOWED_TAGS = ['p', 'strong', 'em', 's', 'mark', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'pre', 'code', 'hr', 'br', 'blockquote'];

router.post("/create", auth.isAuthorized, csrfProtection, (req, res, next) => {
  if(req.body.name === undefined || req.body.name == "")
    return next({name:'missing-parameter'});
  
  let id = uuidv4();
  db.addSurvey(id, req.user.username, req.body.name).then(() => {
    res.json({name: req.body.name, id: id});
  }).catch((e) => next(e));
});

router.get("/getSurveys", auth.isAuthorized, (req, res, next) => {
  db.getSurveys(req.user.username).then((result) => {
    res.json(result);
  }).catch((e) => next(e));
});

router.get("/getSurvey/:id", (req, res, next) => {
  db.getSurvey(req.params.id).then((result) => {
    res.json(result);
  }).catch((e) => next(e));
});

router.get("/getSurvey/name/:id", (req, res, next) => {
  db.getName(req.params.id).then((name) => {
    res.json({error: false, name: name});
  }).catch((e) => next(e));
});

router.get("/results/:id", auth.isAuthorized, (req, res, next) => {
  db.getResults(req.user.username, req.params.id).then((result) => {
    res.json(result);
  }).catch((e) => next(e));
});
  
router.post("/changeJson", auth.isAuthorized, csrfProtection, (req, res, next) => {
  let input = JSON.parse(req.body.json);
  if(input.completedHtml)
    input.completedHtml = DOMPurify.sanitize(input.completedHtml, {ALLOWED_TAGS});
  if(input.completedBeforeHtml)
    input.completedBeforeHtml = DOMPurify.sanitize(input.completedBeforeHtml, {ALLOWED_TAGS});
  if(input.loadingHtml)
    input.loadingHtml = DOMPurify.sanitize(input.loadingHtml, {ALLOWED_TAGS});
  
  for(page in input.pages)
    for(el in input.pages[page].elements) 
      if(input.pages[page].elements[el].type == "html")
        input.pages[page].elements[el].html = DOMPurify.sanitize(input.pages[page].elements[el].html, {ALLOWED_TAGS});
  
  db.storeSurvey(req.user.username, req.body.id, JSON.stringify(input)).then(() => {
    res.json({error: false, message: "ok"});
  }).catch((e) => next(e));
});

router.post("/changeName", auth.isAuthorized, csrfProtection, (req, res, next) => {
  if(req.body.name === undefined || req.body.name == "" || req.body.id === undefined || req.body.id == "")
    return next({name:'missing-parameter'});

  db.changeName(req.user.username, req.body.id, req.body.name).then(() => {
    res.json({error: false, message: "ok"});
  }).catch((e) => next(e));
});
  
router.post("/delete", auth.isAuthorized, csrfProtection, (req, res, next) => {
  db.deleteSurvey(req.user.username, req.body.id).then(() => {
    res.json({});
  }).catch((e) => next(e));
});

router.post("/post", (req, res, next) => {
  db.postResults(req.body.postId, req.body.surveyResult).then(() => {
    res.json({error: false, message: "ok"});
  }).catch((e) => next(e));
});

module.exports = router;
