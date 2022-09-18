
const smashGG = require('../modules/SmashGG')

var express = require('express');
var router = express.Router();

router.get('/query_tournaments', async function(req, res, next) {

  const key = req.query.smashgg_key;

  const result = await smashGG.queryTournamentsSmashGG(key)
  res.json(result)

});

router.get('/query_players', isLoggedIn, async function(req, res, next) {

  const tourney_id = req.query.tourney_id;
  const key = req.query.smashgg_key;

  const result = await smashGG.queryPlayersSmashGG(key,tourney_id)
  res.json(result)

});

router.get('/query_sets', isLoggedIn, async function(req, res, next) {

  const event_id = req.query.event_id;
  const key = req.query.smashgg_key;

  const result = await smashGG.querySetsSmashGG(key,event_id)
  res.json(result)

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  }
  res.status(401).send("Unauthorized");
}

module.exports = router;
