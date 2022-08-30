var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/editor', isLoggedIn, function(req, res, next) {
  res.render('editor',{ user: req.user, isLoggedIn: req.isLoggedIn });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   req.isLoggedIn = true
   return next();
  }
  res.redirect('/');
}

module.exports = router;
