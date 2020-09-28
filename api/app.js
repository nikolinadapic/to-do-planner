var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var postsAPIRouter = require("./routes/postsAPI");
var usernameAPIRouter = require("./routes/usernameAPI");
var insertpostAPIRouter = require("./routes/insertpostAPI");
var numberOfPostsAPIRouter = require("./routes/numberOfPostsAPI");
var deleteAPIRouter = require("./routes/deleteAPI");
var updateAPIRouter = require("./routes/updateAPI");
var checkAPIRouter = require("./routes/checkAPI");
var statisticsAPIRouter = require("./routes/statisticsAPI");
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/postsAPI", postsAPIRouter);
app.use("/usernameAPI", usernameAPIRouter);
app.use("/insertpostAPI", insertpostAPIRouter);
app.use("/numberOfPostsAPI", numberOfPostsAPIRouter);
app.use("/deleteAPI", deleteAPIRouter);
app.use("/updateAPI", updateAPIRouter);
app.use("/checkAPI", checkAPIRouter);
app.use("/statisticsAPI", statisticsAPIRouter);

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
