var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Meat and Taters
// This is for the username passport framework
const bcrypt = require("bcrypt")
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient, Prisma } = require('@prisma/client');
const passport = require("passport")
const LocalStrategy = require("passport-local")
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(passport.session());

passport.use(new LocalStrategy(async function verify(username, password, done){
  // verify the username password and call done() to seal the deal
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({where:{username:username
  },include:{
    userbucket:true
  }})
  if(username != user.username){
    done(null,false, {message:"incorrect Username"})
  }
  bcrypt.compare(password, user.password, (err,data)=>{
    if(err) throw err
    console.log(data)
    if(data){
      done(null,user)
    }else{
      done(null,false, {message:"Error"})
    }
  })

}))
passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({where:{
    id:id
  }})
  await prisma.$disconnect()
    done(null, user);
  } catch(err) {
    done(err);
  }
});
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
