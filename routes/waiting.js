require('dotenv').config()

var express = require('express');
var router = express.Router();

router.get('/waiting', function(req, res, next) {
  res.render('waiting',{  });
});

module.exports = router;
