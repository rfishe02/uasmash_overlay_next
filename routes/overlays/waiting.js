require('dotenv').config()

var express = require('express');
var router = express.Router();

router.get('/waiting', function(req, res, next) {
  res.render('./overlays/waiting',{  });
});

module.exports = router;
