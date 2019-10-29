var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const {spawn} = require('child_process');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(8080, function () {
  console.log("server liste 8080");

  var screen = spawn("/usr/bin/infoStart.sh", [
      "97", "97"
  ]);
    screen.once('exit', (code, signal) => {
        console.log("screen EXIT",code, signal)
    });
    screen.stdout.on('data', error => {
        console.log('screen data ', new String(error));
    });
    screen.stderr.on('error', error => {
        console.log('screen error ', new String(error));
    });

  var infoCoder;
  setTimeout(()=>{
      infoCoder=spawn("/usr/bin/ffmpeg", [
          "-f", "x11grab",
          "-video_size", "1920x1080",
          "-i", ":98.0",
          "-codec:v", "libx264",
          '-r', '30', "-preset", "ultrafast",
          "-y", "/var/www/rasp/public/1.mp4",
          "-bsf:v", "h264_mp4toannexb",
          "-bufsize", "700k",
          "-f", "rtp_mpegts",
          "rtp://236.0.0.1:" + 1000
      ])
      infoCoder.stderr.on('data', error => {
          console.log('ffmpeg data ', new String(error));
      });
  },2000)
})

module.exports = app;
