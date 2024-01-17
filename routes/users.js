
require('dotenv').config()

var express = require('express');
var router = express.Router();

const passport = require('passport');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {

    res
    .status(200)
    .json({redirectUrl: '/'});

  }
);

router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/login', failureMessage: true }), 
  async function (req, res, next){

    res
    .status(200)
    .json({ redirectUrl: '/dashboard' });

  }
);

router.post(
  '/logout',
  function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).json({ redirectUrl: '/' });
    });
  }
);

module.exports = router;
