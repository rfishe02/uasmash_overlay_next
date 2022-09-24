
var express = require('express');
var router = express.Router();

router.get('/upcoming', function(req, res, next) {
  res.render('./overlays/upcoming',{  });
});

module.exports = router;
