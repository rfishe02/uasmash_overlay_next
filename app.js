require('dotenv').config()
require('./bin/auth');

var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var editorRouter = require('./routes/editor');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.SECRET_KEY,
  name: 'uaoverlay_webapp',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' }),
  cookie: {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    maxAge: (86400 * 1000)
  },
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

//TODO: Configure sessions & authentication with cookies.
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/', editorRouter);
app.use('/users', usersRouter);

app.set('view engine', 'ejs');

module.exports = app;
