var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
let cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./controllers/userController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Connect to Database
mongoose.connect('mongodb://127.0.0.1:27017/certificationdb',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => { console.log('Connected to Database') })
  .catch((error) => { console.log(error) })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let corsOption = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOption));

app.use('/', userRouter);


app.listen(8080, () => {
  console.log("runing at 8080");
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
