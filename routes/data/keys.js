var express = require('express');
var router = express.Router();

const db = require('../../bin/db')

function generateRandomString() {
  var result           = ''
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._-._-._01234567890123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < 25; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

router.post('/overlay/get_key', isLoggedIn, async function(req, res, next) {

  try {
    const user_id = req.body.user_id;
    const overlay_path = req.body.overlay_path;
    
    const result = await db.pool.query("SELECT * FROM user_overlays WHERE user_id = ? AND overlay_path = ?",[user_id,overlay_path]);
    res.send(result);

  } catch (e) {
    res.status(401).send("Unauthorized");
    next(e)
  }

});

router.post('/overlay/create_key', isLoggedIn, async function(req, res, next) {

  try {
    const user_id = req.body.user_id;
    const overlay_path = req.body.overlay_path;
    const overlay_name = req.body.overlay_name;
    const key_value = generateRandomString();

    const result = await db.pool.query("INSERT INTO user_overlays(user_id,overlay_path,overlay_name,key_value) VALUES(?,?,?,?)",[user_id,overlay_path,overlay_name,key_value]);
    res.send([{user_id: user_id, overlay_path: overlay_path, overlay_name: overlay_name, key_value: key_value}]);

  } catch (e) {
    res.status(401).send("Unauthorized");
    next(e)
  }

});

router.post('/overlay/update_key', isLoggedIn, async function(req, res, next) {

  try {
    const user_id = req.body.user_id;
    const overlay_path = req.body.overlay_path;
    const overlay_name = req.body.overlay_name;
    const key_value = generateRandomString();

    const result = await db.pool.query("UPDATE user_overlays SET key_value=?, overlay_name=? WHERE user_id = ? AND overlay_path = ?",[key_value,overlay_name,user_id,overlay_path]);
    res.send([{user_id: user_id, overlay_path: overlay_path, overlay_name: overlay_name, key_value: key_value}]);

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
