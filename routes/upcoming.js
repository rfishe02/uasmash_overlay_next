
var express = require('express');
var router = express.Router();

router.get('/upcoming', function(req, res, next) {
  res.render('upcoming',{  });
});

module.exports = router;
