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
var dashboardRouter = require('./routes/dashboard');
var editorRouter = require('./routes/editor');
var strikerRouter = require('./routes/striker');

var stagesRouter = require('./routes/data/stages');
var stageListRouter = require('./routes/data/stage_lists');
var overlayRouter = require('./routes/data/overlays');

var playersRouter = require('./routes/overlays/players');
var stageStrikesRouter = require('./routes/overlays/stage_strikes');
var waitingRouter = require('./routes/overlays/waiting');
var upcomingRouter = require('./routes/overlays/upcoming');

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
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/editor', editorRouter);
app.use('/striker', strikerRouter);

app.use('/overlay', playersRouter);
app.use('/overlay', stageStrikesRouter)
app.use('/overlay', waitingRouter);
app.use('/overlay', upcomingRouter);

app.use('/data/stages', stagesRouter);
app.use('/data/stage_lists', stageListRouter)
app.use('/data/overlay', overlayRouter);

app.set('view engine', 'ejs');

module.exports = app;
