
const db = require('../bin/db')

var express = require('express');
var router = express.Router();

router.post('/save_list', isLoggedIn, async function(req, res, next) {
  try {

    const user_id = req.body.user_id;
    const stage_list = req.body.stage_list;

    const result = await db.pool.query(
      `INSERT INTO stage_lists (user_id,stage_list) VALUES (?,?)
      ON DUPLICATE KEY UPDATE stage_list=?;`,
      [user_id, stage_list, stage_list]
    );

    res.status(200).send({message:"Successful insert"});

  } catch (error) {
    res.status(500).send({message:"Error"});
    next(error);
  }
});

router.post('/load_list', isLoggedIn, async function(req, res, next) {
  try {

    const user_id = req.body.user_id;
    const result = await db.pool.query("SELECT * FROM stage_lists WHERE user_id = ?",[user_id])

    res.json(result)

  } catch (error) {
    next(error);
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  }
  res.redirect('/');
}

module.exports = router;
