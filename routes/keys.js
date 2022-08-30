var express = require('express');
var router = express.Router();

const db = require('../bin/db')

function generateRandomString() {
  var result           = ''
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~-._~-._~01234567890123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < 25; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

router.post('/get_key', isLoggedIn, async function(req, res, next) {

  try {
    const user_id = req.body.user_id;
    const module_name = req.body.module_name;

    const result = await db.pool.query("SELECT * FROM user_keys WHERE user_id = ? AND module_name = ?",[user_id,module_name]);
    res.send(result);

  } catch (e) {
    res.status(401).send("Unauthorized");
    next(e)
  }

});

router.post('/create_key', isLoggedIn, async function(req, res, next) {

  try {
    const user_id = req.body.user_id;
    const module_name = req.body.module_name;
    const key_value = generateRandomString();

    const result =
    await db.pool.query("INSERT INTO user_keys(user_id,module_name,key_value) VALUES(?,?,?)",[user_id,module_name,key_value]);
    res.send({module_name: module_name, key_value: key_value});

  } catch (e) {
    res.status(401).send("Unauthorized");
    next(e)
  }

});

router.post('/update_key', isLoggedIn, async function(req, res, next) {

  try {
    const user_id = req.body.user_id;
    const module_name = req.body.module_name;
    const key_value = generateRandomString();

    const result = await db.pool.query("UPDATE user_keys SET key_value=? WHERE user_id = ? AND module_name = ?",[key_value,user_id,module_name]);

    res.send({module_name: module_name, key_value: key_value});

  } catch (e) {
    res.status(401).send("Unauthorized");
    next(e)
  }

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  }
  res.status(401).send("Unauthorized");
}

module.exports = router;
