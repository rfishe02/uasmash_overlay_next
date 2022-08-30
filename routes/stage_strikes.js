
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/stage_strikes', function(req, res, next) {
  res.render('stage_strikes', {  });
});

module.exports = router;
