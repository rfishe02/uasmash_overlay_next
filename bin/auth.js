
require('dotenv').config()

const User = require('../modules/user')
const db = require('../bin/db')

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {

        const pass = await bcrypt.hash(password, 10)

        const result = await db.pool.query(
          "INSERT INTO users (user_id, user_name, user_password) VALUES (DEFAULT, ?, ?)",
          [username, pass]
        );

        const user = new User(null, username)

        return done(null, user)

      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {

        /* Find user in the database  */

        const result = await db.pool.query("SELECT * FROM users WHERE user_name = ?", [username])
        if(result.length == 0) {
          return done(null, false, { message: 'User not found' })
        }

        /* Compare passwords to validate user */

        var found_user = result[0]
        const validate = await bcrypt.compare(password, found_user.user_password);

        if(found_user.user_name != username || !validate) {
          return done(null, false, { message: 'Wrong username or password' });
        }

        const user = new User(found_user.user_id, found_user.user_name)

        return done(null, user, { message: "Successful login" });

      } catch (error) {
        return done(error);
      }
    }
  )
);
