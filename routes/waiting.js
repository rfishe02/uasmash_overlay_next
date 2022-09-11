require('dotenv').config()

var express = require('express');
var router = express.Router();

router.get('/waiting', function(req, res, next) {
  res.render('waiting',{apiKey: process.env.SMASHGG_KEY });
});

module.exports = router;
