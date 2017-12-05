var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
User =require('./models/user');

mongoose.connect('mongodb://rohanrao35:fitracker1@ds129946.mlab.com:29946/fitracker');





var db = mongoose.connection;
app.listen(3000, 'localhost');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.get('/api/users', function(req, res){

  User.getUsers(function(err, users){
      if(err){
        throw err;
      }
      res.json(users);
  });

});
// app.post('/api/genres', (req, res) => {
// 	var genre = req.body;
// 	Genre.addGenre(genre, (err, genre) => {
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });
app.post('/api/users', (req, res) => {
	var user = req.body;
  console.log('ERROR MAY HAPPEN');
	User.addUser(user, (err, user) => {


		if(err){
			throw err;
		}

		res.json(user);
	});
});


app.post('/login', function(req,res){
  console.log('Logged In\n')
  console.log(req.body);
  res.render("userInfo");
});

app.get('/moveToCreate', function(req,res){
  //console.log(req.body);
  res.render("signUp");
});

app.post('/createAccount', function(req,res){

    var user = req.body;
	  User.addUser(user, (err, user) => {
		    if(err){
			       throw err;
		    }
		    //res.json(user);
    });
    res.render("index");
  console.log('Created Account\n')
  console.log(req.body);
  //res.render("index");


});


app.get('/newWorkout', function(req,res){
  res.render("addWorkout");
});

app.post('/addWorkout', function(req,res){
  console.log('Workout Added\n')
  console.log(req.body);
  res.render("userInfo");
});


app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
