require('dotenv').config()

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/players', function(req, res, next) {
  res.render('./overlays/players', { });
});

module.exports = router;
