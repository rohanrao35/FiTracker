var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
User =require('./models/user');
Workout =require('./models/workout')

mongoose.connect('mongodb://rohanrao35:fitracker1@ds129946.mlab.com:29946/fitracker', { useMongoClient: true });


var currentUser;


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
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '/public/js')));




app.get('/api/users', function(req, res){

  User.getUsers(function(err, users){
      if(err){
        throw err;
      }
      res.json(users);
  });
});



app.post('/login', function(req, res){

  var collection = db.collection('users');
  var user;

  collection.find({username: req.body.username}).toArray(function (err, items) { ////////////////
    user = items[0];
    if(user == null){
      console.log('USER DOES NOT EXIST');
      res.render("index");
      return;
    }
    console.log(user.password);
    console.log(req.body.password);

    if(user.password != req.body.password){
      console.log('WRONG PASSWORD');
      res.render("index");
    }
    else{
      console.log('LOGGED IN');
      collection.updateOne({username: req.body.username}, {$set:{loggedIn: 1}});////////////
      //res.render("userInfo", {user: req.body.userName});
      currentUser = req.body.username;////////////////
      res.render("userInfo");

      console.log('Current User: '+ currentUser)
    }
  });
});




app.post('/createAccount', function(req,res){
    var user = req.body;
    user.loggedIn = 0;
	  User.addUser(user, (err, user) => {
		    if(err){
			       throw err;
		    }
    });
    res.render("index");
  console.log('Created Account\n')
  console.log(req.body);
});
/////


app.get('/moveToCreate', function(req,res){
  console.log(req.body);
  res.render("signUp");
});


app.get('/newWorkout', function(req,res){
  res.render("addWorkout");
});

app.post('/addWorkout', function(req,res){
  var workout = req.body;


  var collection = db.collection('users');
  //var user;

  collection.find({username: currentUser}).toArray(function (err, items) {

      // console.log(items[0].username);
      // console.log(items[0].gender);
      // console.log(items[0].age);
      workout.username = items[0].username;
      workout.gender = items[0].gender;
      workout.age = items[0].age;


      if(workout.gender == 0){
        workout.caloriesBurned = ((workout.age * 0.2017) - (workout.weightAtStart * 0.09036) + (workout.heartRate * 0.6309) - 55.0969) * workout.duration / 4.184;
      }
      else{
        workout.caloriesBurned = ((workout.age * 0.074) - (workout.weightAtStart * 0.05741) + (workout.heartRate * 0.4472) - 20.4022) * workout.duration / 4.184;
      }

      //(MEN) Calories Burned = [(Age x 0.2017) — (Weight x 0.09036) + (Heart Rate x 0.6309) — 55.0969] x Time / 4.184.
      //(WOMEN) Calories Burned = [(Age x 0.074) — (Weight x 0.05741) + (Heart Rate x 0.4472) — 20.4022] x Time / 4.184.




      console.log(workout);

      Workout.addWorkout(workout, (err, workout) => {
          if(err){
               throw err;
          }
      });

      console.log('Workout Added\n')
      console.log(req.body);
      res.render("userInfo");

  });
});


app.post('/createAccount', function(req,res){
    var user = req.body;
    user.loggedIn = 0;
	  User.addUser(user, (err, user) => {
		    if(err){
			       throw err;
		    }
    });
    res.render("index");
  console.log('Created Account\n')
  console.log(req.body);
});















app.use('/', index);
//app.use('/users', users);



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
