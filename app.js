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
var stagesRouter = require('./routes/stages');
var keysRouter = require('./routes/keys');

var editorRouter = require('./routes/editor');
var overlayRouter = require('./routes/overlay');
var waitingRouter = require('./routes/waiting');
var upcomingRouter = require('./routes/upcoming');

var strikerRouter = require('./routes/striker');
var stageStrikesRouter = require('./routes/stage_strikes');

var stageListRouter = require('./routes/stage_lists');

var app = express();

app.use(
  cors({
    "origin": ["*"],
    "methods": "GET,POST",
    credentials: true
  })
)

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
  store: new SQLiteStore({ db: 'sessions.db', dir: './' }),
  cookie: {
    secure: false,
    httpOnly: true,
    SameSite: 'strict',
    maxAge: (86400 * 1000),
  },
}));

//secure: process.env.NODE_ENV !== "development",

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

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/stages', stagesRouter);

app.use('/editor', editorRouter);
app.use('/module', overlayRouter);

app.use('/striker', strikerRouter);
app.use('/module',stageStrikesRouter)

app.use('/module', waitingRouter);
app.use('/module', upcomingRouter);

app.use('/users', usersRouter);
app.use('/keys', keysRouter);

app.use('/stage_lists',stageListRouter)

app.set('view engine', 'ejs');

module.exports = app;
