
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/overlay', function(req, res, next) {
  res.render('overlay', {  });
});

module.exports = router;
