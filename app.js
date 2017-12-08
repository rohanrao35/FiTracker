var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var index = require('./routes/index');
var session = require("express-session");
//var users = require('./routes/users');

var app = express();
User =require('./models/user');
Workout =require('./models/workout')

mongoose.connect('mongodb://rohanrao35:fitracker1@ds129946.mlab.com:29946/fitracker', { useMongoClient: true });


// var currentUser;


var db = mongoose.connection;
// app.listen(3000, 'localhost');
app.listen(process.env.PORT || 3000)



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));
app.use(express.static(path.join(__dirname, '/public')));





app.get('/api/users', function(req, res){

  User.getUsers(function(err, users){
      if(err){
        throw err;
      }
      res.json(users);
  });
});



app.post('/login/', function(req, res){
  console.log(req.params.username);

  var collection = db.collection('users');
  var user;
  var first;
  collection.find({username: req.body.username}).toArray(function (err, items) { ////////////////
    user = items[0];
    
    if(user == null){
      console.log('USER DOES NOT EXIST');
      // alert("No user exists for that username");
      res.render("index");
      return;
    }
    console.log(user.password);
    console.log(req.body.password);

    if(user.password != req.body.password){
      console.log('WRONG PASSWORD');
      // alert("Username or Password is incorrect");
      res.render("index");
    }
    else{
      console.log('LOGGED IN');
      collection.updateOne({username: req.body.username}, {$set:{loggedIn: 1}});

      var currentUser = req.body.username;
      var collectiona = db.collection('workouts');
      first = items[0].firstName;
      collectiona.find({username: currentUser}).sort( { date: -1 } ).toArray(function (err, items1) {
        res.render("userInfo", {user: req.body.username, f: first, num: items1.length});
        console.log('Current User: '+ currentUser);
        
      });

      // //req.session.userID = req.body.username;
      // // console.log(req.session);
      // res.render("userInfo", {user: req.body.username});
      // currentUser = req.body.username;////////////////
      // //res.render("userInfo");
      // console.log('Current User: '+ currentUser)
    }
  });
});


app.get('/getWorkouts7/:username', function(req,res){

  console.log(req.session.userID);
  //var currentUser = req.session.userID;
  var currentUser = req.params.username;
  var collection = db.collection('workouts');

  collection.find({username: currentUser}).limit(7).sort( { date: -1 } ).toArray(function (err, items) {

    var milesRun = new Array(items.length);
    var heartRate = new Array(items.length);
    var caloriesBurned = new Array(items.length);
    var duration = new Array(items.length);

    for (var i = 0; i < items.length; i++) {
      milesRun[i] = items[i].milesRun;
      heartRate[i] = items[i].heartRate;
      caloriesBurned[i] = items[i].caloriesBurned;
      duration[i] = items[i].duration;
    }
    milesRun.reverse();
    heartRate.reverse();
    caloriesBurned.reverse();
    duration.reverse();
    // console.log('Miles Run: ' + milesRun);
    // console.log('Heart Rate: ' + heartRate);
    // console.log('Calories Burned: ' + caloriesBurned);
    // console.log('Duration: ' + duration);

    res.render("userWorkouts7", {miles: milesRun, heart: heartRate, calories: caloriesBurned, time: duration, num: items.length });
  });
});

app.get('/getWorkouts30/:username', function(req,res){
  //var currentUser = req.session.userID;
  var currentUser = req.params.username;

  var collection = db.collection('workouts');

  collection.find({username: currentUser}).limit(30).sort( { date: -1 } ).toArray(function (err, items) {

    var milesRun = new Array(items.length);
    var heartRate = new Array(items.length);
    var caloriesBurned = new Array(items.length);
    var duration = new Array(items.length);

    for (var i = 0; i < items.length; i++) {
      milesRun[i] = items[i].milesRun;
      heartRate[i] = items[i].heartRate;
      caloriesBurned[i] = items[i].caloriesBurned;
      duration[i] = items[i].duration;
    }

    milesRun.reverse();
    heartRate.reverse();
    caloriesBurned.reverse();
    duration.reverse();

    // console.log('Miles Run: ' + milesRun);
    // console.log('Heart Rate: ' + heartRate);
    // console.log('Calories Burned: ' + caloriesBurned);
    // console.log('Duration: ' + duration);
    res.render("userWorkouts30", {miles: milesRun, heart: heartRate, calories: caloriesBurned, time: duration, num: items.length});
  });

});


app.get('/getWorkouts365/:username', function(req,res){
 // var currentUser = req.session.userID;
 var currentUser = req.params.username;
  var collection = db.collection('workouts');

  collection.find({username: currentUser}).limit(365).sort( { date: -1 } ).toArray(function (err, items) {

    var milesRun = new Array(items.length);
    var heartRate = new Array(items.length);
    var caloriesBurned = new Array(items.length);
    var duration = new Array(items.length);

    for (var i = 0; i < items.length; i++) {
      milesRun[i] = items[i].milesRun;
      heartRate[i] = items[i].heartRate;
      caloriesBurned[i] = items[i].caloriesBurned;
      duration[i] = items[i].duration;
    }

    milesRun.reverse();
    heartRate.reverse();
    caloriesBurned.reverse();
    duration.reverse();

    // console.log('Miles Run: ' + milesRun);
    // console.log('Heart Rate: ' + heartRate);
    // console.log('Calories Burned: ' + caloriesBurned);
    // console.log('Duration: ' + duration);

    res.render("userWorkouts365", {miles: milesRun, heart: heartRate, calories: caloriesBurned, time: duration, num: items.length});
  });
});

app.get('/getWorkoutsAll/:username', function(req,res){
 // var currentUser = req.session.userID;
 var currentUser = req.params.username;
  var collection = db.collection('workouts');

  collection.find({username: currentUser}).sort( { date: -1 } ).toArray(function (err, items) {

    var milesRun = new Array(items.length);
    var heartRate = new Array(items.length);
    var caloriesBurned = new Array(items.length);
    var duration = new Array(items.length);

    for (var i = 0; i < items.length; i++) {
      milesRun[i] = items[i].milesRun;
      heartRate[i] = items[i].heartRate;
      caloriesBurned[i] = items[i].caloriesBurned;
      duration[i] = items[i].duration;
    }

    milesRun.reverse();
    heartRate.reverse();
    caloriesBurned.reverse();
    duration.reverse();

    // console.log('Miles Run: ' + milesRun);
    // console.log('Heart Rate: ' + heartRate);
    // console.log('Calories Burned: ' + caloriesBurned);
    // console.log('Duration: ' + duration);
    res.render("userWorkoutsAll", {miles: milesRun, heart: heartRate, calories: caloriesBurned, time: duration, num: items.length});
  });
});


app.post('/createAccount', function(req, res){
  var user = req.body;
  console.log(user);
  user.loggedIn = 0;

  if(req.body.password != req.body.Cpassword){
    console.log("pass doesnt match");
    res.render("signUp");
  }
  else if (req.body.password.length < 8) {
    console.log("pass isnt long enough");
    res.render("signUp");
  }
  else {
    User.addUser(user, (err, user) => {
        if(err){
            throw err;
        }
        res.render("index");
    });

  }
  res.render("index");
});

app.get('/moveToCreate', function(req,res){
  // console.log(req.body);
  res.render("signUp");
});


app.get('/newWorkout/:username', function(req,res){
  var currentUser = req.params.username;
  res.render("addWorkout", {user: currentUser});
});

app.post('/addWorkout/:username', function(req,res){
  var workout = req.body;
  var currentUser = req.params.username;

  var first;
  var collection = db.collection('users');
  //var user;

  collection.find({username: currentUser}).toArray(function (err, items) {

      // console.log(items[0].username);
      // console.log(items[0].gender);
      // console.log(items[0].age);
      first = items[0].firstName;
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


      if (workout.caloriesBurned < 0) {
          workout.caloriesBurned = 0;
      }

      console.log(workout);

      Workout.addWorkout(workout, (err, workout) => {
          if(err){
               throw err;
          }
      });

      var currentUser = req.body.username;
      var collectiona = db.collection('workouts');
      first = items[0].firstName;
      collectiona.find({username: currentUser}).sort( { date: -1 } ).toArray(function (err, items1) {
        res.render("userInfo", {user: currentUser, f: first, num: items1.length});
        console.log('Current User: '+ currentUser);

      });


  });
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
