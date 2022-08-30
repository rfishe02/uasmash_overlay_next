
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
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        /* Create user & put them int the database. */
        const user = new User()
        user.name = username
        user.password = await bcrypt.hash(password, 10)

        const result = await db.pool.query("INSERT INTO users (user_id, user_name, user_password) VALUES (DEFAULT, ?, ?)", [user.name, user.password]);

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

        const user = new User()
        user.id = found_user.user_id
        user.name = found_user.user_name

        return done(null, user, { message: "Successful login" });

      } catch (error) {
        return done(error);
      }
    }
  )
);

// TODO: Remove demo feature.

function generateRandomString() {
  var result           = ''
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~-._~-._~01234567890123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < 25; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

passport.use(
  'demo_signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        /* Create user & put them int the database. */
        const user = new User()
        user.id = 1
        user.name = username
        const user_password = await bcrypt.hash(generateRandomString(), 10)

        const result = await db.pool.query("INSERT INTO users (user_id, user_name, user_password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE user_password=?",
        [user.id,user.name,user_password,user_password]);

        return done(null, user)

      } catch (error) {
        done(error);
      }
    }
  )
);
