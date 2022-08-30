
require('dotenv').config()

var express = require('express');
var router = express.Router();

const passport = require('passport');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {

    res
    .status(200)
    .json({
      user: {id: req.user.id, name: req.user.name},
      message: 'Signup successful'
    });

  }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {

          if (err || !user) {
            res.status(401).json({ message:info.message })
            return next(new Error(info.message));
          }

          req.login(
            user,
            async (error) => {
              if (error) return next(error);

              return res
              .status(200)
              .json({ user: user, message: "Login successful" });

            }
          );

        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

//TODO: Logout feature

module.exports = router;
