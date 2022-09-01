var express = require('express')
var router = express.Router()

const db = require('../bin/db')

router.get('/', async function(req, res, next) {
  try {

    const result = await db.pool.query("SELECT * FROM stages")

    res.setHeader("Content-Type", "application/json; charset=UTF-8")
    res.json(result)

  } catch (err) {
    next(err)
  }
});

module.exports = router
